// fsライブラリを読み込み
const fs = require('fs');

// ファイルを取得してdownloadディレクトリに出力
exports.downloadContent = (client, messageId, downloadPath) => client.getMessageContent(messageId)
  .then((stream) => new Promise((resolve, reject) => {
    const writable = fs.createWriteStream(downloadPath);
    stream.pipe(writable);
    stream.on('end', () => resolve(downloadPath));
    stream.on('error', reject);
  }));
