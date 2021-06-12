exports.index = async (event) => {
  const message = {
    type: 'text',
    text: `ユーザーが退出しました...\n退出したユーザー: ${event.left.members[0].userId}`,
  };
  return message;
};
