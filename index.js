var ThisPersonDoesNotExist = require('./this-person-does-not-exist')
var express = require("express");
var app = express();

const generator = new ThisPersonDoesNotExist();


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/person", (req, res, next) => {
    generator.getImage({
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
    generator.getImage({
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

