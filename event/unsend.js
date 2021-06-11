exports.index = async (event) => {
  const message = {
    type: 'text',
    text: 'ここは個チャだよ！',
  };
  return message;
};
