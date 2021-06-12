exports.index = async (event) => {
  const message = {
    type: 'text',
    text: `メッセージが取り消されました！\n取り消されたmessageId: ${event.unsend.messageId}`,
  };
  return message;
};
