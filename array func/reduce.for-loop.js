let ary = [1, 2, 3, 4, 5]

  //reduce()
  let total = ary.reduce((acc, cur) => acc + cur, 0)
  console.log(total)

  //for loop
  function reduce(ary) {
    let aryTotal = 0;
    for (i = 0; i < ary.length; i++) {
      aryTotal += ary[i];
      // console.log(aryTotal)
    }
    return aryTotal
  }
  console.log(reduce(ary));