const express = require('express');
const line = require('@line/bot-sdk');
const bot = require('../bot');
const config = require('../config').index();

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => { res.send('Deploy succeeded'); });
app.post('/webhook', line.middleware(config), bot.index);

app.listen(PORT);
console.log(`Server running at ${PORT}`);
