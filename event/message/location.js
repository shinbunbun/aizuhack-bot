// 位置情報を処理する関数
export const locationEvent = (event) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: `受け取った住所: ${event.message.address}`,
  };
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
