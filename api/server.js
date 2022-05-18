// モジュールの読み込み
require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const bot = require('../bot');

// configの読み込み
const config = require('../config').index();

const PORT = process.env.PORT || 3000;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (req, res) => { res.send('Deploy succeeded'); });
// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', line.middleware(config), bot.index);

app.listen(PORT);
console.log(`Server running at ${PORT}`);
