const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    // lay dang number float
    var h = parseFloat(req.body.height);
    var w = parseFloat(req.body.weight);
    var Result = w / (h * h);
    res.send("Your BMI is " + Result);
});

app.listen("3000", function () {
    console.log("This is port 3000");
});
