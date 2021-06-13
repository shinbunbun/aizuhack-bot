// テキストメッセージの処理をする関数
const textEvent = (event) => {
  let message;
  switch (event.message.text) {
    case 'こんにちは': {
      message = {
        type: 'text',
        text: 'Hello, world',
      };
      break;
    }
    case '複数メッセージ': {
      message = [
        {
          type: 'text',
          text: 'Hello, user',
        },
        {
          type: 'text',
          text: 'May I help you?',
        },
      ];
      break;
    }
    case 'クイックリプライ': {
      message = {
        type: 'text',
        text: 'クイックリプライ（以下のアクションはクイックリプライ専用で、他のメッセージタイプでは使用できません）',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'camera',
                label: 'カメラを開く',
              },
            },
            {
              type: 'action',
              action: {
                type: 'cameraRoll',
                label: 'カメラロールを開く',
              },
            },
            {
              type: 'action',
              action: {
                type: 'location',
                label: '位置情報画面を開く',
              },
            },
          ],
        },
      };
      break;
    }
    case 'スタンプメッセージ': {
      message = {
        type: 'sticker',
        packageId: '446',
        stickerId: '1988',
      };
      break;
    }
    case '画像メッセージ': {
      message = {
        type: 'image',
        originalContentUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
        previewImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
      };
      break;
    }
    // todo
    /* case '音声メッセージ': {
      message = {
        type: 'audio',
        originalContentUrl: 'https://example.com/original.m4a',
        duration: 60000,
      };
      break;
    } */
    // todo
    /* case '動画メッセージ': {
      message = {
        type: 'video',
        originalContentUrl: '',
        previewImageUrl: '',
      };
      break;
    } */
    case '位置情報メッセージ': {
      message = {
        type: 'location',
        title: 'my location',
        address: '〒160-0004 東京都新宿区四谷一丁目6番1号',
        latitude: 35.687574,
        longitude: 139.72922,
      };
      break;
    }
    case 'イメージマップメッセージ': {
      // todo
      break;
    }
    case 'ボタンテンプレート': {
      message = {
        type: 'template',
        altText: 'ボタンテンプレート',
        template: {
          type: 'buttons',
          thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
          imageBackgroundColor: '#FFFFFF',
          title: 'ボタンテンプレート',
          text: 'ボタンだお',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/images/photos/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバックアクション',
              data: 'button-postback',
            },
            {
              type: 'message',
              label: 'メッセージアクション',
              data: 'button-message',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
            {
              type: 'datetimepicker',
              label: '日時選択アクション',
              data: 'button-date',
              mode: 'datetime',
              initial: '2021-06-01t00:00',
              max: '2022-12-31t23:59',
              min: '2020-01-01t00:00',
            },
            {
              type: 'datetimepicker',
              label: 'カメラアクション',
              data: 'button-date',
              mode: 'datetime',
              initial: '2021-06-01t00:00',
              max: '2022-12-31t23:59',
              min: '2020-01-01t00:00',
            },
            {
              type: 'cameraRoll',
              label: 'カメラロールアクション',
            },
            {
              type: 'location',
              label: '位置情報アクション',
            },
          ],
        },
      };
      break;
    }
    case '確認テンプレート': {
      message = {
        type: 'template',
        altText: '確認テンプレート',
        template: {
          type: 'confirm',
          text: '確認テンプレート',
          actions: [
            {
              type: 'message',
              label: 'はい',
              text: 'yes',
            },
            {
              type: 'message',
              label: 'いいえ',
              text: 'no',
            },
          ],
        },
      };
      break;
    }

    case 'ここはどこ': {
      if (event.source.type === 'user') {
        message = {
          type: 'text',
          text: 'ここは個チャだよ！',
        };
      } else if (event.source.type === 'group') {
        message = {
          type: 'text',
          text: 'ここはグループだよ！',
        };
      }
      break;
    }
    default: {
      message = {
        type: 'text',
        text: `受け取ったメッセージ: ${event.message.text}\nそのメッセージの返信には対応してません...`,
      };
      break;
    }
  }
  return message;
};

// イメージイベントを処理する関数
const imageEvent = () => {
  const message = {
    type: 'text',
    text: '画像を受け取りました！',
  };
  return message;
};

// ビデオイベントを処理する関数
const videoEvent = () => {
  const message = {
    type: 'text',
    text: 'ビデオを受け取りました！',
  };
  return message;
};

// オーディオイベントを処理する関数
const audioEvent = () => {
  const message = {
    type: 'text',
    text: 'オーディオを受け取りました！',
  };
  return message;
};

// ファイルイベントを処理する関数
const fileEvent = () => {
  const message = {
    type: 'text',
    text: 'ファイルを受け取りました！',
  };
  return message;
};

// 位置情報イベントを処理する関数
const locationEvent = (event) => {
  const message = {
    type: 'text',
    text: `受け取った住所: ${event.message.address}`,
  };
  return message;
};

// スタンプメッセージを処理する関数
const stickerEvent = (event) => {
  let message;
  switch (event.message.stickerId) {
    case '1988': {
      message = {
        type: 'sticker',
        packageId: '446',
        stickerId: '1989',
      };
      break;
    }
    default: {
      message = {
        type: 'text',
        text: `受け取ったstickerId: ${event.message.stickerId}\nそのスタンプの返信には対応してません...`,
      };
      break;
    }
  }
  return message;
};

exports.index = async (event) => {
  let message;
  switch (event.message.type) {
    case 'text': {
      message = textEvent(event);
      break;
    }
    case 'image': {
      message = imageEvent();
      break;
    }
    case 'video': {
      message = videoEvent();
      break;
    }
    case 'audio': {
      message = audioEvent();
      break;
    }
    case 'file': {
      message = fileEvent();
      break;
    }
    case 'location': {
      message = locationEvent(event);
      break;
    }
    case 'sticker': {
      message = stickerEvent(event);
      break;
    }
    default: {
      message = {
        type: 'text',
        text: 'そのイベントには対応していません...',
      };
      break;
    }
  }
  return message;
};
