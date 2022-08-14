// 用 axios 去目標 API 抓資料
// await 版本
// 更好的參數設定
// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
// 查到股票代碼的中文名稱
const axios = require('axios');
const moment = require('moment');
const fs = require('fs').promises;
const mysql = require('mysql2')
require('dotenv').config();

//開始抓資料
// let, const:  block scope {} 區域作用域
// var: function scope 函式作用域
// console.log('DB_HOST', process.env.DB_HOST);
async function readStock() {
    let connection;
    try {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // 需要從 stock.txt 的檔案裡讀取股票代碼
        let stockNo = await fs.readFile('stock.txt', 'utf8')

        // 去查詢股票代碼的中文名稱
        // https://www.twse.com.tw/zh/api/codeQuery?query=2330
        let queryNameResponse = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?`, {
            params: {
                query: stockNo
            },
        });
        let suggestions = queryNameResponse.data.suggestions
        // console.log(suggestions)
        let suggestion = suggestions[0]
        if (suggestion === '(無符合之代碼或名稱)') {
            console.error(suggestion)
            throw new Error(suggestion)
        }
        let stockName = suggestion.split('\t').pop()
        console.log('stockName:', stockName)
        // INSERT INTO stocks (id, name) VALUES ('2330', '台積電')
        // 自己串 sql 字串: 容易出錯、有資訊安全上的風險 sql injection
        // connection.query

        let saveNameResult = connection.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
        // console.log(saveNameResult);

        let queryDate = moment().format('YYYYMMDD');
        let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
            params: {
                response: 'json',
                date: queryDate,
                stockNo: stockNo
            },
        })
        // console.log(response.data)

        // response.data -> 整包陣列資料 
        // response.data.data 全部陣列資料裡的其中一項,名稱為data的資料
        let data = response.data.data.map((d) => { 
            d = d.map((vaule) => {
                // 寫法一 regular expression 的方式
                return value.replace(/,/g, ''); //把逗點「,」取代為''
                // 寫法二 value.split(',').join("")
            })
        })
    } catch (err) {
        console.error(err)
    } finally {
        if (connection) {
            // 關掉連線
            connection.end();
        }
    }
}

readStock()