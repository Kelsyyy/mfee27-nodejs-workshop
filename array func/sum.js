let ary = [
    {
      id: 1,
      type: 'A',
      price: 100,
    },
    {
      id: 2,
      type: 'B',
      price: 200,
    },
    {
      id: 3,
      type: 'A',
      price: 150,
    },
  ];
  
  // 找出 type 是 A
  let result = ary.filter((item) => {
    return item.type === 'A';
  });
  
  // O(n)
  ary.filter((item) => item.type === 'A');
  
  // result 也會是一個陣列
  console.log(result);
  
  // 用 for-loop
  
  function filter(ary) {
    let result = [];
    for (let i = 0; i < ary.length; i++) {
      if (ary[i].type === 'A') {
        result.push(ary[i]);
      }
    }
    return result;
  }
  console.log(filter(ary));