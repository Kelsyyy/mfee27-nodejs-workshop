const first = require('./first'); 
const second = require('./second'); // second 已經被 first 先引用，不會再被重複引用

console.log('I am index');

//上面執行結果
// I am second  // 先執行./first 裡引用的./second
// I am first   // 再執行 first
// I am index   // 最後是這裡的 console.log('I am index')


// 大致底層運作原理 
// 這裡已經紀錄過第一次引用的東西，再重複引用會被 return 掉
// let map = {};
// function require(module_name) {
//   if(map[module_name]) {
//     return map[module_name];
//   }
//   map[module_name] = load module_name;
// }