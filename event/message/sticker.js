// スタンプメッセージを処理する関数
export const stickerEvent = (event) => {
  let message;
  // スタンプのIDごとに条件分岐
  switch (event.message.stickerId) {
    // スタンプのIDが1988だった場合
    case '1988': {
      // 返信するメッセージを作成
      message = {
        type: 'sticker',
        packageId: '446',
        stickerId: '1989',
      };
      break;
    }
    // それ以外のIDだった場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `受け取ったstickerId: ${event.message.stickerId}\nそのスタンプの返信には対応してません...`,
      };
      break;
    }
  }
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
