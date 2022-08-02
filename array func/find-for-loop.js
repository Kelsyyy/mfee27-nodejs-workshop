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

//find()
function item(ary){
  return ary.age > 20
}
  console.log(ary.find(item))

//arrow function
let result = ary.find((item) => {
  return item.age > 20;
  })
  console.log(result)

//for-loop
function find(ary) {
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].age > 20) {
      return ary[i];
    }
  }
}
console.log(find(ary));