var ThisHorseDoesNotExist = require('../this-X-does-not-exist.js/this-horse-does-not-exist')
const horseGen = new ThisHorseDoesNotExist();

function requestHandler(req, res, next, resX, resY) {
    horseGen.getImage({
        width: parseInt(resX),
        height: parseInt(resY),
        path: 'heeses'
    }).then(resA => {
        console.log('genertated:', resA);
        var options = {
            root: ('heeses'),
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