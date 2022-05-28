// メンバー退出イベントが飛んできた時
export default (event) => {
  // ログに出力
  console.log(`ユーザーが退出しました...\n退出したユーザー: ${event.left.members[0].userId}`);
};
