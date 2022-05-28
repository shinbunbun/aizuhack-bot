// モジュール読み込み
import line from '@line/bot-sdk';
import crypto from 'crypto';
// 各イベントごとの処理をするファイルの読み込み
import messageFunc from './event/message.js';
import unsendFunc from './event/unsend.js';
import postbackFunc from './event/postback.js';
import joinFunc from './event/join.js';
import leaveFunc from './event/leave.js';
import followFunc from './event/follow.js';
import unfollowFunc from './event/unfollow.js';
import memberJoinedFunc from './event/memberJoined.js';
import memberLeftFunc from './event/memberLeft.js';

const client = new line.Client({
  channelAccessToken: process.env.channelAccessToken,
});

export const index = (req, res) => {
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
          // メッセージイベントが飛んできた時はmessage.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = await messageFunc(event, client);
          break;
        }
        case 'unsend': {
          // 送信取消イベントが飛んできた時はunsend.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = unsendFunc(event);
          break;
        }
        case 'postback': {
          // ポストバックイベントが飛んできた時はpostback.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = postbackFunc(event);
          break;
        }
        case 'join': {
          // 参加イベントが飛んできた時はjoin.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = joinFunc();
          break;
        }
        case 'leave': {
          // 退出イベントが飛んできた時はleave.jsのindexを呼び出す
          leaveFunc(event);
          break;
        }
        case 'follow': {
          // フォローイベントが飛んできた時はfollow.jsのindexを呼び出す
          message = followFunc();
          break;
        }
        case 'unfollow': {
          // フォロー解除イベントが飛んできた時はunfollow.jsのindexを呼び出す
          // 処理結果をmessageに格納
          unfollowFunc(event);
          break;
        }
        case 'memberJoined': {
          // メンバー参加イベントが飛んできた時はmemberJoined.jsのindexを呼び出す
          // 処理結果をmessageに格納
          message = memberJoinedFunc(event);
          break;
        }
        case 'memberLeft': {
          // メンバー退出イベントが飛んできた時はmemberLeft.jsのindexを呼び出す
          // 処理結果をmessageに格納
          memberLeftFunc(event);
          break;
        }
        default:
          break;
      }
      // もしmessageがundefinedでなかった場合は返信処理
      if (message !== undefined) {
        // 返信するメッセージをログに出力
        console.log(`返信メッセージ: ${JSON.stringify(message)}`);
        // メッセージを返信
        client.replyMessage(event.replyToken, message)
          .then(() => {
            console.log('Reply succeeded');
          }).catch((err) => console.log(`${JSON.stringify(message)}\n\n\n${err}`));
      }
    });
    // 署名検証に失敗した場合
  } else {
    // ログに出力
    console.log('署名認証エラー');
  }
  return res.json('ok');
};
