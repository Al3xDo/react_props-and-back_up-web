//const mongoose = require('mongoose');
//database created or chose
//mongoose.connect("mongodb://localhost:27017/fruitsDB");
console.log("hi")

















/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URL
// base url for connecting url
const url = 'mongodb://localhost:27017';

///database Name
const dbName = 'fruitsDB';

// create a new MongoClient, them useN >> avoid deprecationWarning
const client = new MongoClient(url);

//use connect method to connect to the server
client.connect(function (err) {
    //if no erre >> connected
    assert.equal(null, err);
    console.log("connected");
    const db = client.db(dbName);
    client.close();
});
// failed to connect to server ?? run server first

/*const insertDocuments = function (db, callback) {
    // get the documents collection
    const collection = db.collection('fruits');
    // insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda good"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great stuff"
        }
    ], function (err, result) {
        //validation``
        //make sure they are no erre
        assert.equal(err, null);
        //make sure they are 3 result
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    }
    )
};*/
/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});*/