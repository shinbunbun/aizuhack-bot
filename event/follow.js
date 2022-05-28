// フォローイベントがとんできた時
export default () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '友達追加ありがとうございます！',
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
