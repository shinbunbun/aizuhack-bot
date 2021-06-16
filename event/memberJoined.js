exports.index = (event) => {
  const message = {
    type: 'text',
    text: `ユーザーが参加しました！\n参加したユーザー: ${event.joined.members[0].userId}`,
  };
  return message;
};
