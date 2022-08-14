// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fs = require('fs').promises;

//開始抓資料
// let stockNo = 2330;
// let queryDate = moment().format('YYYYMMDD');
async function readStock() {
    try {
        let stockNo = await fs.readFile('stock.txt', 'utf8')
        // console.log(stockNo);
        let queryDate = moment().format('YYYYMMDD');
        // console.log(queryDate);
        let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
            params: {
                response: 'json',
                date: queryDate,
                stockNo: stockNo,
            },
        })
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

readStock()