// モジュールの読み込み
import dotenv from 'dotenv';
import express from 'express';
import { middleware } from '@line/bot-sdk';
import { index } from '../bot';

dotenv.config();

// configの読み込み
const config = require('../config').index();

const PORT = process.env.PORT || 3000;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (req, res) => { res.send('Deploy succeeded'); });
// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', middleware(config), index);

app.listen(PORT);
console.log(`Server running at ${PORT}`);
