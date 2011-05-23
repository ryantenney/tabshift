#!/usr/bin/env node


var express = require("express");
var app = express.createServer();


app.configure(function () {
    app.use(express.static(__dirname + "/static"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});


var tabs = {};


app.get("/tabs/", function (req, res) {
    res.send(tabs);
});

app.post("/tabs/", function (req, res) {
    tabs = req.body;
    res.end();
});


app.get("/tab/:id", function (req, res) {
    var id = req.params.id;
    if (tabs[id]) {
        res.send(tabs[id]);
    } else {
        res.writeHead(404);
    }
});

app.post("/tab/:id", function (req, res) {
    tabs[req.params.id] = req.body;
    res.end();
});

app.put("/tab/:id", function (req, res) {
    tabs[req.params.id] = req.body;
    res.end();
});

app.del("/tab/:id", function (req, res) {
    delete tabs[req.params.id];
    res.end();
});


app.listen(22111);
