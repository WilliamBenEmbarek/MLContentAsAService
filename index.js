var ThisPersonDoesNotExist = require('./this-person-does-not-exist')
var ThisCatDoesNotExist = require('./this-cat-does-not-exist');
var ThisArtworkDoesNotExist = require('./this-artwork-does-not-exist');
var express = require("express");
var app = express();

const personGen = new ThisPersonDoesNotExist();
const catGen = new ThisCatDoesNotExist();
const artGen = new ThisArtworkDoesNotExist();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/person", (req, res, next) => {
    personGen.getImage({
        width: parseInt(256),
        height: parseInt(256),
        path: 'people'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('people'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
})

app.get("/person/:resX/:resY", (req, res, next) => {
    personGen.getImage({
        width: parseInt(req.params.resX),
        height: parseInt(req.params.resY),
        path: 'people'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('people'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
});

app.get("/cat", (req, res, next) => {
    catGen.getImage({
        width: parseInt(256),
        height: parseInt(256),
        path: 'cats'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('cats'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
})

app.get("/cat/:resX/:resY", (req, res, next) => {
    catGen.getImage({
        width: parseInt(req.params.resX),
        height: parseInt(req.params.resY),
        path: 'cats'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('cats'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
});

app.get("/art", (req, res, next) => {
    artGen.getImage({
        width: parseInt(256),
        height: parseInt(256),
        path: 'artwork'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('artwork'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
})

app.get("/art/:resX/:resY", (req, res, next) => {
    artGen.getImage({
        width: parseInt(req.params.resX),
        height: parseInt(req.params.resY),
        path: 'artwork'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('artwork'),
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
          }
        res.sendFile('latest.jpeg', options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent image');
            }
        })
    }).catch(err => {
        console.log('error->', err);
        next(err);
    });
});