//async
const fs = require('fs');

function readFile2(path, coding) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, coding, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function awaitReadFile() {
    try {
        let result = await readFile2('test.txt','utf8');
        console.log(result)
    } catch (err) {
        console.error(err);
    }
} 

awaitReadFile();

