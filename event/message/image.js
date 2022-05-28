// get-content.jsファイルを読み込み
import { downloadContent } from '../../get-content.js';

// イメージを処理する関数
export const imageEvent = (event, client) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '画像を受け取りました！',
  };
  // ファイルを保存する
  downloadContent(client, event.message.id, `./download/${event.message.id}.jpg`)
    .catch((error) => console.log(error));
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
