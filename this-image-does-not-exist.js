var sharp = require("sharp");
var EventEmitter = require("events");
var request = require("request");

/**
 * ThisPersonDoesNotExist Class
 *
 * @class ThisCatDoesNotExist
 * @extends {EventEmitter}
 */
class thisImageDoesNotExist extends EventEmitter {
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
      name,
    });
  }

  /**
   * Get the image remotely
   *
   * @returns {Object}
   * @memberof ThisPersonDoesNotExist
   */
  async getRemoteImage(text) {
    console.log(text);
    var headers = {
      "api-key": "21809966-1d3b-44f1-bec8-165fb11f2adc",
    };

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: "https://api.deepai.org/api/text2img",
          headers: headers,
          formData: {
            'text': text
          }
        },
        (error, response, body) => {
          if (error) return reject(error);
          try {
            if (response.statusCode == 200) {
              var obj = JSON.parse(body);
              request.get(
                {
                  url: obj.output_url,
                  encoding: null,
                },
                (error, response, body) => {
                  if (error) return reject(error);
                  try {
                    if (response.statusCode == 200) {
                      // eslint-disable-next-line no-undef
                      let img = Buffer.from(body, "base64");
                      let mimType = response.headers["content-type"];
                      resolve({
                        img,
                        mimType,
                      });
                    } else {
                      throw error;
                    }
                  } catch (e) {
                    reject(e);
                  }
                }
              );
            } else {
              throw error;
            }
          } catch (e) {
            reject(e);
          }
        }
      );
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
  async getImage({ width, height, path, text }) {
    width = width || 128;
    height = height || 128;
    path = path || ".";
    let { img, mimType } = await this.getRemoteImage(text);
    if (img && mimType) {
      let response;
      response = await this.getImagePath(img, path, width, height);
      return {
        status: true,
        data: response,
      };
    }
  }
}

module.exports = thisImageDoesNotExist;
