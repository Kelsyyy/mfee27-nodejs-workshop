const express = require('express');
const router = express.Router();

// 可以針對這個 router 使用某些中間件
// 順序很重要 要放在前面 在會先經過解析 在往下執行
// router.use(express.json());

// ----- 接收註冊資料 -----
// /api/1.0/auth/register
// 中間件基本參數 (req, res, next)
router.post(`/api/1.0/auth/register`, (req, res, next) => {
    //確認資料是否收到，會存在body裡面
    console.log(req.body); //要先有中間件 不然直接看結果是undefine

    res.json({});
});

module.exports = router