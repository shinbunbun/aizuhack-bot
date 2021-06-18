// メンバー退出イベントが飛んできた時
exports.index = (event) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: `ユーザーが退出しました...\n退出したユーザー: ${event.left.members[0].userId}`,
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
