var personRest = require('./requestHandlers/personRequestHandler');
var catRest = require('./requestHandlers/catRequestHandler');
var artRest = require('./requestHandlers/artworkRequestHandler');
var horseRest = require('./requestHandlers/horseRequestHandler');
var deepAiRest = require('./requestHandlers/deepAiRequestHandler');

var express = require("express");
var app = express();

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

app.get("/person", (req, res, next) => {
    personRest(req,res,next,256,256);
});

app.get("/person/:resX/:resY", (req, res, next) => {
    personRest(req,res,next,req.params.resX,req.params.resY);
});

app.get("/cat", (req, res, next) => {
    catRest(req,res,next,256,256);
});

app.get("/cat/:resX/:resY", (req, res, next) => {
    catRest(req,res,next,req.params.resX,req.params.resY);
});

app.get("/art", (req, res, next) => {
    artRest(req,res,next,256,256);
});

app.get("/art/:resX/:resY", (req, res, next) => {
    artRest(req,res,next,req.params.resX,req.params.resY);
});

app.get("/horse", (req, res, next) => {
    horseRest(req,res,next,256,256);
});

app.get("/horse/:resX/:resY", (req, res, next) => {
    horseRest(req,res,next,req.params.resX,req.params.resY);
});

app.get("/:image/", (req, res, next) => {
    deepAiRest(req, res, next,256,256, req.params.image);
});

app.get("/:image/:resX/:resY", (req, res, next) => {
    deepAiRest(req, res, next, req.params.resX, req.params.resY, req.params.image);
});

app.use(function(req, res){
    res.sendStatus(404);
});