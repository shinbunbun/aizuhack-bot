// フォロー解除イベントが飛んできた時
exports.index = (event) => {
  // ログを出力
  console.log(`unfollowされました...\nuserId: ${event.source.userId}`);
};
