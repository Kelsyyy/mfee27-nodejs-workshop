// exports = module.exports = {};  //記憶體給一個新空間

let name = 'AAAA';


// function getName() {
//   return name;
// }

let car = { // 這裡花括號會再給一個新空間
    name: 'aaa',
    getName: function () {
    return 'BBB';
    },
    age: 18,
};

//使用 module.exports 不要直接使用exports
// module.exports = {
//     getName,
// };

// 原本的 exports 跟 module.exports 指向同一個記憶體
// 這裡變成跟 car 同一個記憶體
exports = car;

// 最後會回傳第一行得空陣列 exports = module.exports = {}; 
// 不是回傳 exports = car物件
// return module.exports; 


