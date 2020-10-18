// jshint esversion:6

const express = require("express");
// goi api de lay thong tin nguoi dung nhap vao
const bodyParser = require("body-parser");

const app = express();
// thuong dung nhieu nhat de lay thong tin
app.use(bodyParser.urlencoded({ extended: true }));
// de post nhung thu da duoc nested, la 1 option cua bodyParser
// ten cua get phai trung voi ten cua action trong file html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    // nho chuyen kieu truoc khi tinh
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("The result of the calculator is " + result);
});
app.listen("3000", function () {
    console.log("This is port 3000");
});
