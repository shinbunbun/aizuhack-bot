// fsライブラリを読み込み
import fs from 'fs';

// ファイルを取得してdownloadディレクトリに出力
export const downloadContent = (client, messageId, downloadPath) => client
  .getMessageContent(messageId)
  .then((stream) => new Promise((resolve, reject) => {
    const writable = fs.createWriteStream(downloadPath);
    stream.pipe(writable);
    stream.on('end', () => resolve(downloadPath));
    stream.on('error', reject);
  }));
