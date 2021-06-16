exports.index = async (event) => {
  console.log(`unfollowされました...\nuserId: ${event.source.userId}`);
};
