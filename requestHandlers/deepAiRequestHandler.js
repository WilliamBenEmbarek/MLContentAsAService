var thisImageDoesNotExist = require('../this-X-does-not-exist.js/this-image-does-not-exist');
const imageGen = new thisImageDoesNotExist();

function requestHandler(req, res, next, resX, resY, text) {
    imageGen.getImage({
        width: parseInt(resX),
        height: parseInt(resY),
        path: 'deepAI',
        text: text
    }).then(resA => {
        console.log('generated:', resA);
        var options = {
            root: ('deepAI'),
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