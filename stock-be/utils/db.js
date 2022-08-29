require('dotenv').config(); //在引用一次，維持這個模組的獨立性，不用依靠外部的引用才能使用這個模組

// 使用資料庫
const mysql = require('mysql2');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 限制 pool 連線數的上限
    connectionLimit: 10,
    // 保持 date 是 string，sql取得的日期會轉成 js 的 date 物件 (用下面方式拿掉) 
    dateStrings: true,
  })
  .promise();

  module.exports = pool;
