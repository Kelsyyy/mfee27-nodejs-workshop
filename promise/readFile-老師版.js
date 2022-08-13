const fs = require('fs');

// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error('發生錯誤', err);
  }
  console.log('callback', data);
});

//Promise寫法
let p = new Promise((resolve, reject) => {
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
      return reject(err); // if(status === pending) promise status -> rejected
    }
    // 如果 reject 沒有加上 return
    // 這行會被印出來 (即使是 reject 時也是)
    console.log('inside');
    resolve(data); // if(status === pending) promise status -> fulfilled
  });
});

p.then((data) => {
  console.log('promise 版本', data);
}).catch(console.error);

// IIFE Immediately Invoked Function Expression
// 立即執行函式
(async () => {
  try {
    let data = await p;
    console.log('await', data);
  } catch (e) {
    console.error(e);
  }
})();

//async寫法
// async function doWork() {}
// doWork();

// console.error;
// console.error();

// function test(cb) {
//   console.log(cb);
// }

// function param() {
//   console.log('param');
//   return 1;
// }

// test(param);
// // test(param()); // test(1)

// 函式執行順序
// function test2() {
//   console.log('3');
// }

// function test1() {
//   console.log('1');
//   test2();
//   console.log('2');
// }

// test1();