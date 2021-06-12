exports.index = async (event) => {
  const message = {
    type: 'text',
    text: `ユーザーが参加しました！\n参加したユーザー: ${event.source.userId}`,
  };
  return message;
};
