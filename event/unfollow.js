// フォロー解除イベントが飛んできた時
export default (event) => {
  // ログを出力
  console.log(`unfollowされました...\nuserId: ${event.source.userId}`);
};
