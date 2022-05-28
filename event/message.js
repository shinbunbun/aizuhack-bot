// ファイル読み込み
import { audioEvent } from './message/audio.js';
import { fileEvent } from './message/file.js';
import { imageEvent } from './message/image.js';
import { locationEvent } from './message/location.js';
import { stickerEvent } from './message/sticker.js';
import { textEvent } from './message/text.js';
import { videoEvent } from './message/video.js';

// メッセージイベントが飛んできた時に呼び出される
export default (event, client) => {
  let message;
  // メッセージタイプごとの条件分岐
  switch (event.message.type) {
    case 'text': {
      // テキストの場合はtextEventを呼び出す
      // 実行結果をmessageに格納する
      message = textEvent(event, client);
      break;
    }
    case 'image': {
      // イメージの場合はimageEventを呼び出す
      // 実行結果をmessageに格納する
      message = imageEvent(event, client);
      break;
    }
    case 'video': {
      // ビデオの場合はvideoEventを呼び出す
      // 実行結果をmessageに格納する
      message = videoEvent(event, client);
      break;
    }
    case 'audio': {
      // オーディオの場合はaudioEventを呼び出す
      // 実行結果をmessageに格納する
      message = audioEvent(event, client);
      break;
    }
    case 'file': {
      // ファイルの場合はfileEventを呼び出す
      // 実行結果をmessageに格納する
      message = fileEvent(event, client);
      break;
    }
    case 'location': {
      // 位置情報の場合はlocationEventを呼び出す
      // 実行結果をmessageに格納する
      message = locationEvent(event);
      break;
    }
    case 'sticker': {
      // スタンプの場合はstickerEventを呼び出す
      // 実行結果をmessageに格納する
      message = stickerEvent(event);
      break;
    }
    // それ以外の場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: 'そのイベントには対応していません...',
      };
      break;
    }
  }
  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
