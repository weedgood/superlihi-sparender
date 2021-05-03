const path = require('path');
module.exports = class service {
  constructor() {

  }
  /**
   * 
   * @param {*} name 
   * @param {*} config 
   */
  service(name = '', ...args) {
    // console.log(path.join(zuoyan.ROOT_PATH, './model/' + name));
    const s = require(path.join(zuoyan.SRC_PATH, './service/' + name));
    return new s(...args);
  }
};