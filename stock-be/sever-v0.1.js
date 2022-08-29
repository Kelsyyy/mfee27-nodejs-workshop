const express = require('express');
// 初始化 dotenv
require('dotenv').config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();

// 在程式碼中，不要讓某些常數散亂在專案的各處
// 至少在同一個檔案中，可以放到最上方統一管理
// 目標是: 只需要改一個地方，全部的地方就生效
// 降低漏改到的風險 -> 降低程式出錯的風險
const port = process.env.SERVER_PORT;

// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res) => {
  res.send('Hello Express');
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});