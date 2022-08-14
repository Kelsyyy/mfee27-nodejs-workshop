// 用 axios 去目標 API 抓資料
// await 版本
// 更好的參數設定
// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
// 查到股票代碼的中文名稱
const axios = require('axios');
const moment = require('moment');
const fs = require('fs').promises;

//開始抓資料

async function readStock() {
    try {
        let stockNo = await fs.readFile('stock.txt', 'utf8')

        // 去查詢股票代碼的中文名稱
        // https://www.twse.com.tw/zh/api/codeQuery?query=2330
        let queryNameResponse = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?`,{
            params: {
                query: stockNo
            },
        });
        let suggestions = queryNameResponse.data.suggestions
        console.log(suggestions)
        let suggestion = suggestions[0] 
        if (suggestion === '(無符合之代碼或名稱)') {
            console.error(suggestion)
            throw new Error(suggestion)
        }
        let stockName = suggestion.split('\t').pop()
        console.log('stockName:',stockName)

        let queryDate = moment().format('YYYYMMDD');
        let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
            params: {
                response: 'json',
                date: queryDate,
                stockNo: stockNo
            },            
        })
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

readStock()