//Promise 是一個表示非同步運算的「最終」完成或失敗的物件
//new promise() 物件 ,new完是物件
//建構式 Promise，需要傳一個參數 executor
//new Promise() 是一個函式,要傳一個參數 excutor
//excutor也是一個函式,裡面有兩個參數(resolve,reject) -> 參數名可以自訂,但通常會使用這兩個名字
//function excutor(resolve,reject)
//非同步：把非同步程式放到 executor 裡
//最終完成：呼叫 resolve 代表成功, resolve(回傳結果,資料)
//最終失敗：呼叫 reject 代表失敗, reject(回傳失敗原因)

function doWork(job, timer) {
    return new Promise((resolve, reject) => {
        // 執行非同步 setTimeout
        setTimeout(() => {
            let dt = new Date();
            //resolve() 成功後回傳我們要內容
            resolve(`完成工作 ${job} at ${dt.toISOString()}`);
        }, timer);
    });
}

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙(3) => 吃早餐(5) => 寫功課(3)

let brushPromise = doWork('刷牙', 3000);
// console.log(brushPromise); // pending -> 表示還不知道結果
brushPromise
    .then((data) => {
        //.then() 用來接住 resolve 後的結果, 結果在自訂一個變數顯示data
        console.log('在 promise 裡', data);
        // console.log(brushPromise);

        let eatPromise = doWork('吃早餐', 5000);
        return eatPromise;
    })
    .then((data) => {
        // promise chain
        console.log('在 promise 裡', data);
        let writePromise = doWork('寫功課', 3000);
        return writePromise;
    })
    .then((data) => {
        console.log('在 promise 裡', data);
    })
    .catch((err) => {
        // .catch() 用來接住 reject 失敗原因
        console.error('在 promise 發生錯誤:', err);
    });