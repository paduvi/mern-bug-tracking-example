/**
 * Created by chotoxautinh on 9/29/16.
 */
var express = require('express');
var app = express();

app.use(express.static('static'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});