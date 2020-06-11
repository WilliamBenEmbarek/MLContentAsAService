var sharp = require("sharp");
var request = require("request");
var EventEmitter = require("events");

/**
 * ThisPersonDoesNotExist Class
 *
 * @class ThisPersonDoesNotExist
 * @extends {EventEmitter}
 */
class ThisPersonDoesNotExist extends EventEmitter {

    constructor() {
        super();
    }

    /**
     * Create the image locally and return an object with the details
     *
     * @param {string} body buffer
     * @param {string} path path
     * @param {number} width default 128
     * @param {number} height default 128
     * @returns {object} 
     * @memberof ThisPersonDoesNotExist
     */
    async getImagePath(body, path, width, height) {
        let name = `latest.jpeg`;
        let ImagePath = await sharp(body)
            .resize(width, height)
            .toFile(`${path}/${name}`);
        return Object.assign(ImagePath, {
            name
        })
    }

    /**
     * Get the image remotely
     *
     * @returns {Object}
     * @memberof ThisPersonDoesNotExist
     */
    async getRemoteImage() {
        return new Promise((resolve, reject) => {
            request.get({
                url: 'https://thispersondoesnotexist.com/image',
                encoding: null
            }, (error, response, body) => {
                if (error) return reject(error);
                try {
                    if (response.statusCode == 200) {
                        let img = Buffer.from(body,'base64');
                        let mimType = response.headers["content-type"];
                        resolve({
                            img,
                            mimType
                        });
                    } else {
                        throw error;
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    /**
     * Obtain a image
     *
     * @param {Object} options {
     *         width,
     *         height,
     *         type,
     *         path
     *     }
     * @returns {Object}
     * @memberof ThisPersonDoesNotExist
     */
    async getImage({
        width,
        height,
        path
    }) {

        width = width || 128;
        height = height || 128;
        path = path || '.';
        let {
            img,
            mimType
        } = await this.getRemoteImage();
        if (img && mimType) {
            let response;
            response = await this.getImagePath(img, path, width, height);
            return {
                status: true,
                data: response
            };
        }
    }
}

module.exports = ThisPersonDoesNotExist;