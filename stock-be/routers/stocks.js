// /stock-be/routers/stock.js
// router: mini app

// 起手式
// const express = require('express');
// const router = express.Router();
// module.exports = router;

const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

// API
// --- 列出所有股票代碼 ---
// GET /stocks
router.get('/', async (req, res, next) => {
  console.log('/api/1.0/stocks');

  // 寫法1:
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];
  // 寫法2:
  let [data] = await pool.execute('SELECT * FROM stocks');

  // console.log('result', data);
  res.json(data);
});

// --- 列出某個股票代碼的所有報價資料 ---
// GET /stocks/2330 先取的股票代碼 例如2330
// GET /stocks/2330?page=1
router.get('/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId; // 透過params取得變數:stockId

  // 去資料庫撈資料
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [stockId]);
  // 不要用樣板字串 容易發生以下情況
  // sql injection
  // stockId 2330 || 1=1 --
  // SELECT * FROM stock_prices WHERE stock_id=2330 || 1=1 -- and ....
  // http://localhost:3002/api/1.0/stocks/2412 || 1=1 --
  // let [data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id=${stockId}`);

  // 分頁
  // 透過 query string 取得目前要第幾頁的資料
  // 如果沒有設定，就預設為第一頁的資料
  let page = req.query.page || 1;

  // 一頁有幾筆 perPage
  const perPage = 5;

  // 取得總筆數
  // COUNT(*) 計算指定欄位資料總筆數, (*)統計資料表所有資料有幾筆數量, AS 後面可自己給變數名, 例如下面範例把算出來的東西命名為total 
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);
  total = total[0].total; // sql2取得的資料都是陣列, 所以total結果 [ { total: 57 } ]

  // 計算總頁數 Math.ceil
  let lastPage = Math.ceil(total / perPage);
  
  // 計算 offset 要跳過幾筆
  const offset = perPage * (page - 1);

  // 根據 perPage 及 offset 去取得資料
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?',[stockId, perPage, offset]) // LIMIT 限制一次抓幾筆, OFFSET 要跳過幾筆

  // 把取得的資料回覆給前端
  res.json({
    pagination: {
      total, // 總共有幾筆
      perPage, // 一頁有幾筆
      page, // 目前在第幾頁
      lastPage, // 總頁數
    },data
  });
});

  module.exports = router;