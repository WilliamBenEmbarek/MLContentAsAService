var ThisCatDoesNotExist = require('../this-X-does-not-exist.js/this-cat-does-not-exist')
const catGen = new ThisCatDoesNotExist();

function requestHandler(req, res, next, resX, resY) {
    catGen.getImage({
        width: parseInt(resX),
        height: parseInt(resY),
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
}
module.exports = requestHandler;