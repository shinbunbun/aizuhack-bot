// モジュール読み込み
const line = require('@line/bot-sdk');
const crypto = require('crypto');
// コンフィグ読み込み
const config = require('./config').index();
// 各イベントごとの処理をするファイルの読み込み
const messageFunc = require('./event/message');
const unsendFunc = require('./event/unsend');
const postbackFunc = require('./event/postback');
const joinFunc = require('./event/join');
const leaveFunc = require('./event/leave');
const followFunc = require('./event/follow');
const unfollowFunc = require('./event/unfollow');
const memberJoinedFunc = require('./event/memberJoined');
const memberLeftFunc = require('./event/memberLeft');

const client = new line.Client(config);

exports.index = (req, res) => {
  console.log(req.body.events);
  // 署名検証
  const signature = crypto.createHmac('sha256', process.env.channelSecret).update(JSON.stringify(req.body)).digest('base64');
  const checkHeader = req.header('X-Line-Signature');
  const { events } = req.body;
  let message;
  // 署名検証が成功した時
  if (signature === checkHeader) {
    // eventsは配列になっているため、forEachで1つずつ処理をする
    // 例えば同時に2つメッセージがきた場合は配列に入って1つのWebhookで飛んでくることがある
    events.forEach(async (event) => {
      // イベントごとに条件分岐
      switch (event.type) {
        case 'message': {
          // メッセージイベントが飛んできた時はmessage.jsのindexを呼び出す＊＊＊＊＊＊
          // 処理結果をmessageに格納
          message = await messageFunc.index(event, client);
          break;
        }
        case 'unsend': {
          // 送信取消イベントが飛んできた時はunsend.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = unsendFunc.index(event);
          break;
        }
        case 'postback': {
          // ポストバックイベントが飛んできた時はpostback.jsのindexを呼び出す＊＊＊＊＊＊
          // 処理結果をmessageに格納
          message = await postbackFunc.index(event);
          break;
        }
        case 'join': {
          // 参加イベントが飛んできた時はjoin.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = joinFunc.index(event);
          break;
        }
        case 'leave': {
          // 退出イベントが飛んできた時はleave.jsのindexを呼び出す
          leaveFunc.index(event);
          break;
        }
        case 'follow': {
          // フォローイベントが飛んできた時はfollow.jsのindexを呼び出す
          message = followFunc.index();
          break;
        }
        case 'unfollow': {
          // フォロー解除イベントが飛んできた時はunfollow.jsのindexを呼び出す
          // 処理結果をmessageに格納
          unfollowFunc.index(event);
          break;
        }
        case 'memberJoined': {
          // メンバー参加イベントが飛んできた時はmemberJoined.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = memberJoinedFunc.index(event);
          break;
        }
        case 'memberLeft': {
          // メンバー退出イベントが飛んできた時はmemberLeft.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = memberLeftFunc.index(event);
          break;
        }
        default:
          break;
      }
      // もしmessageがundefinedだった場合
      if (message === undefined) {
        // レスポンス
        res.json('done');
        // 返信するメッセージが存在する場合
      } else {
        // 返信するメッセージをログに出力
        console.log(`返信メッセージ: ${JSON.stringify(message)}`);
        // メッセージを返信
        client.replyMessage(event.replyToken, message)
          .then((response) => {
            res.json(response);
          }).catch((err) => console.log(`${JSON.stringify(message)}\n\n\n${err}`));
      }
    });
    // 署名検証に失敗した場合
  } else {
    // ログに出力
    console.log('署名認証エラー');
  }
};
