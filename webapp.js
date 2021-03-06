/**
 * Created by chotoxautinh on 9/29/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db;
var test = require('assert')

app.use(express.static('static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.get('/api/bugs', function (req, res) {
    let filter = {};
    if (req.query.status)
        filter.status = req.query.status;
    if (req.query.priority)
        filter.priority = req.query.priority;
    db.collection('bugs').find(filter).toArray(function (err, bugs) {
        test.equal(null, err);
        res.json(bugs);
    });
});

app.post('/api/bugs', function (req, res) {
    let bug = req.body;
    db.collection('bugs').insertOne(bug, function (err, result) {
        test.equal(null, err);
        res.json(bug);
    })
});

app.get('/api/bugs/:id', function (req, res) {
    db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function (err, bug) {
        res.json(bug);
    });
});

app.put('/api/bugs/:id', function (req, res) {
    let oid = ObjectId(req.params.id);
    db.collection("bugs").findOneAndUpdate({_id: oid}, {$set: req.body}, {
        returnOriginal: false,
        upsert: true
    }, function (err, result) {
        test.equal(null, err);
        res.json(result.value);
    });
})

MongoClient.connect('mongodb://localhost:27017/bugsdb', function (err, dbConnection) {
    test.equal(null, err);
    console.log("Connected correctly to db.");
    db = dbConnection;
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
});