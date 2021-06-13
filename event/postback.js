exports.index = async (event) => {
  let message;
  const postbackData = event.postback.data;
  if (event.postback.params) {
    message = {
      type: 'text',
      text: `日時データを受け取りました！\ndata: ${postbackData}\ndatetime: ${event.postback.params.datetime}`,
    };
  } else {
    message = {
      type: 'text',
      text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
    };
  }
  return message;
};
