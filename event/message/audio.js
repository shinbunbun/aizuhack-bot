// get-content.jsファイルを読み込み
import { downloadContent } from '../../get-content.js';

// オーディオを処理する関数
export const audioEvent = (event, client) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'オーディオを受け取りました！',
  };
  // ファイルを保存する
  downloadContent(client, event.message.id, `./download/${event.message.id}.mp3`)
    .catch((error) => console.log(error));
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
