let ary = [
    {
      id: 1,
      name: 'May',
      area: '中山區',
      age: 18,
    },
    {
      id: 2,
      name: 'Jon',
      area: '松山區',
      age: 25,
    },
    {
      id: 3,
      name: 'Ha',
      area: '中山區',
      age: 25,
    },
  ];

  //map()
  let result = ary.map((item) => {
    let city = `台北市${item.area}`;
    return {...item, area: city};
    })
  console.log(result);

  //for-loop
  for (i = 0; i < ary.length; i++){
    ary[i].age += 10;
  }
  console.log(ary);