const axios = require('axios');

const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';

// ポストバックイベントが飛んできた時
exports.index = async (event) => {
  // ユーザーIDを取得
  const { userId } = event.source;
  // DBからユーザーのデータを取得
  const data = (await axios.get(`${dbAPI}/search?userId=${userId}`)).data[0];

  let message;
  // ポストバックデータをpostbackDataに格納
  const postbackData = event.postback.data;
  // もしevent.postback.paramsが存在する場合 リッチメニュー切り替えor日時選択のとき
  if (event.postback.params) {
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `日時データを受け取りました！\ndata: ${postbackData}\ndatetime: ${event.postback.params.datetime}`,
    };
  }
  // タスクの表示を行う
  switch (postbackData) {
    // ユーザーのデータがDBに存在する時
    case 'タスク表示': {
      if (data) {
        // 返信するメッセージを作成.タスクの一覧を表示
        // ここだよここなんだよ

        message = {
          type: 'text',
          text: `以下のタスクがあります\n\ntask : ${data.task}`,
        };
      } else {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'データが存在しません',

        };
      }
      break;
    }
    // 存在しない場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
      };
      break;
    }
  }

  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
