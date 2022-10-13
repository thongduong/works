const cheerio = require("cheerio"); // khai báo module cheerio

const request = require("request-promise"); // khai báo module request-promise

request("https://123job.vn/tuyen-dung", (error, response, html) => {
  // gửi request đến trang
  console.log(response.statusCode); // 200, kiểm tra xem kết nối thành công không :D
});
