const axios = require('axios');

const dbAPI = 'https://sheetdb.io/api/v1/v35tdpllqplhg';

// ポストバックイベントが飛んできた時
exports.index = async (event) => {
  // ユーザーIDを取得
  const { userId } = event.source;
  // DBからユーザーのデータを取得
  const data = (await axios.get(`${dbAPI}/search?userId=${userId}`)).data[0];

  let message;
  // ポストバックデータをpostbackDataに格納
  const postbackData = event.postback.data;
  // もしevent.postback.paramsが存在する場合
  if (event.postback.params) {
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `日時データを受け取りました！\ndata: ${postbackData}\ndatetime: ${event.postback.params.datetime}`,
    };
  }
  // タスクの表示を行う
  else if (postbackData === 'タスク表示') {
    // ユーザーのデータがDBに存在する時
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
  }

  

  // 存在しない場合
  else {
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
    };
  }
  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
