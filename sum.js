//sum.js

let result = 0

function sum(n){
    //1+2+3+...n
    for(i=0; i<=n; i++){
        result+=i
    }
    return result
}

console.log(sum(3)) //6