// jshint eversion:6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const request = require("request");
const { urlencoded } = require("express");

// bat buoc phai co khi can phan tich body
app.use(urlencoded({ extended: true }));
// dong lenh se su dung duoc css
// keo het noi dung qua file static
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    // tao thong tin gui len server
    var data = {
        members: [
            // array of object
            {
                // gan bien vao api title
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };
    var jsonData = JSON.stringify(data);

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    var option = {
        // 2 thuoc tinh phai co trong la url va
        // de authentication thi can tao 1 header object
        // trong 1 object thi se dung dau phay
        url: "https://us10.api.mailchimp.com/3.0/lists/7e3a21d7dc",
        method: "POST", // post len server
        headers: {
            // name va api
            Authorization: "Hyhy_2000 0470d599a0f0ab560a77e1170a1c2b84-us10",
        },
        // phan se gui len server
        body: jsonData,
    };
    request(option, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode == 200)
                res.sendFile(__dirname + "/success.html");
            // truong hop autho thanh cong nhung bi thieu data or ....
            else res.sendFile(__dirname + "/failure.html");
        }
    });
});
// redirect when error occur
app.post("/failure", function (req, res) {
    res.redirect("/");
});
// creating port local
/**app.listen("3000", function () {
    console.log("Running at port 3000");
});**/
// work both on local and public
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
});

// API key 0470d599a0f0ab560a77e1170a1c2b84-us10

// list id 7e3a21d7dc

/*code http hay gap
402 not authentication
400 code chua hoan chinh
chua co gui data
200 successfull */
