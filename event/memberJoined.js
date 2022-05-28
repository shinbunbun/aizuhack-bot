// メンバー参加イベントが飛んできた時
export default (event) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: `ユーザーが参加しました！\n参加したユーザー: ${event.joined.members[0].userId}`,
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
