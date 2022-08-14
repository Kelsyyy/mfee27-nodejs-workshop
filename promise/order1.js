async function test() {
    console.log(1);
    // 有沒有 await 會有很大的差別
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  test();
  console.log(5);