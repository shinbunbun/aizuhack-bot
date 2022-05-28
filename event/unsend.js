// 送信取消イベントが飛んできた時
export default (event) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: `メッセージが取り消されました！\n取り消されたmessageId: ${event.unsend.messageId}`,
  };
  // 呼び出し元の関数（bot.jsのindex）に返信するメッセージを返す
  return message;
};
