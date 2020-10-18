//jshint eversion:6
// use ejs =emmbed js
const express = require("express");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose")
const app = express();
const _ = require("lodash");
// luon dat o sau express, tao view  dir cho pages
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
// vi trong pack chi su dung thong tin tu app.js nen se ko co css, phai su dung static vi css,img la static
app.use(express.static("public"));
// tao database
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const itemSchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model("Item", itemSchema);
// create document
const item1 = new Item({
    name: "Welcome to your todolist"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});
// gop object -> []
const defaultItems = [item1, item2, item3];
//let items = [];
//let workItems = [];
// schema trong schema
const listSchema = {
    name: String,
    items: [itemSchema]
};
const List = mongoose.model("List", listSchema);
app.get("/", function (req, res) {
    /*let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let day = today.toLocaleString("en-US", options);
    // look for folder views and look for key pair
    // moi lan su dung thi phai include het tat cac bien can thay the
    // co 2 bien can thay the nen can paste vao 2 bien
    res.render("list", { listTitle: day, newListItem: items });*/
    // {} -> findall method
    Item.find({}, function (err, foundItems) {
        // no items >> add default items
        if (foundItems.length == 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully");
                }
            });
            // add r >> redirect refresh lai page
            res.redirect("/");
        }
        else {
            res.render("list", {
                listTitle: "Today", newListItem: foundItems
            });
        }
    });
});
app.post("/", function (req, res) {
    /*const item = req.body.newItem;
    if (req.body.list == "Work") {
        workItems.push(item);D
        res.redirect("/work");
    } else {
        // phai co body-parser va urlextended thi moi su dung duoc
        // push de giu cai cu va them cai moi
        items.push(item);
        // can phai co init value, neu ko >> loi
        res.redirect("/");
    }*/
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });
    if (listName == "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function (err, foundList) {
            if (!err) {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName);
            }
        });
    }
});
app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName == "Today") {
        Item.findByIdAndRemove(checkedItemId, function (err) {
            if (!err) {
                console.log("Successfully deleted checked item in Today.");
                res.redirect("/");
            }
        });
    }
    else {
        // $pull find and remove and save item
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted item in other day.");
                console.log(listName);
                console.log(req.body.listName);
                console.log(temp);
                console.log(typeof (listName));
                console.log(typeof (req.body.listName));
                console.log(typeof (temp));
                if (req.body.listName != temp) {
                    console.log("Khac");
                }
                res.redirect("/" + listName);
            }
        });
        /*Item.deleteOne({ _id: checkedItemId }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("successfully deleted 1 item");
                res.redirect("/");
            }
        });*/

    }
});
// DYNAMIC LINK
app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);
    // find{} -> array of list
    // findOne just give one object
    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("list", { listTitle: foundList.name, newListItem: foundList.items });
            }
        }
    });
});
app.get("/about", function (req, res) {
    res.render("about") //ko can para
});
app.listen("3000", function () {
    console.log("server is running at port 3000");
});
/*
trong function >> let=var=const = local
out function >> let=var=const=global
trong pair curly bracket  (if/else,while) var global, let=const=local
>> avoid using var
*/
