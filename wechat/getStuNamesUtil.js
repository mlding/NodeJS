const util = require('./util');
const path = require('path');

const student_file = path.join(__dirname, './2017暑期特训营_-_学员衣服尺码信息_20170811162438.xls');

util.readFileAsync(student_file).then(data => {
  const dataStr = JSON.stringify(data.toString());
  console.log('test', JSON.parse(dataStr));
});


// const stuObj = {};
// const stuNamesArr = [];
// stuObj["Sheet1"].forEach(stuEle => {
//   stuNamesArr.push(stuEle["姓名"]);
// });
//
// console.log('names', stuNamesArr);
