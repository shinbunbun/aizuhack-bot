const line = require('@line/bot-sdk');
const crypto = require('crypto');
const config = require('./config').index();
const messageFunc = require('./event/message');
const unsendFunc = require('./event/unsend');
const postbackFunc = require('./event/postback');
const joinFunc = require('./event/join');
const leaveFunc = require('./event/leave');
const followFunc = require('./event/follow');
const unfollowFunc = require('./event/unfollow');
const memberJoinedFunc = require('./event/memberJoined');
const memberLeftFunc = require('./event/memberLeft');

const client = new line.Client(config);

exports.index = (req, res) => {
  console.log(req.body.events);
  // 署名検証
  const signature = crypto.createHmac('sha256', process.env.channelSecret).update(JSON.stringify(req.body)).digest('base64');
  const checkHeader = req.header('X-Line-Signature');
  const { events } = req.body;
  let message;
  if (signature === checkHeader) {
    events.forEach(async (event) => {
      switch (event.type) {
        case 'message': {
          message = await messageFunc.index(event);
          break;
        }
        case 'unsend': {
          message = await unsendFunc.index(event);
          break;
        }
        case 'postback': {
          message = await postbackFunc.index(event);
          break;
        }
        case 'join': {
          message = joinFunc.index(event);
          break;
        }
        case 'leave': {
          leaveFunc.index(event);
          break;
        }
        case 'follow': {
          message = followFunc.index(event);
          break;
        }
        case 'unfollow': {
          unfollowFunc.index(event);
          break;
        }
        case 'memberJoined': {
          message = memberJoinedFunc.index(event);
          break;
        }
        case 'memberLeft': {
          message = memberLeftFunc.index(event);
          break;
        }
        default:
          break;
      }
      if (message === undefined) {
        res.json('done');
      } else {
        console.log(`message: ${JSON.stringify(message)}`);
        client.replyMessage(event.replyToken, message)
          .then((response) => {
            res.json(response);
          }).catch((err) => console.log(`${JSON.stringify(message)}\n\n\n${err}`));
      }
    });
  } else {
    console.log('署名認証エラー');
  }
};
