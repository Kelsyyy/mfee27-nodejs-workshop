// promise
const fs = require('fs');

function promisReadFile(path, coding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, coding, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
} 

promisReadFile('test.txt','utf8')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))