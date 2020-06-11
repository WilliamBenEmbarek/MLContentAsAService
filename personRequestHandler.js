var ThisPersonDoesNotExist = require('./this-person-does-not-exist')
const personGen = new ThisPersonDoesNotExist();

function requestHandler(req, res, next, resX, resY) {
    personGen.getImage({
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