
const http = require('http');
const url = require('url');

module.exports = class extends zuoyan.Controller {
  constructor() {
    super();
    this.routerS = this.service('router');
    global.renderLimit = 0;
    logger.info('renderLimit init: ' + renderLimit);
  }

  async startServer() {
    const server = http.createServer(async (req, res) => {
      let urlObj = url.parse(req.url, true);
      req.urlObj = urlObj;

      //连接关闭事件
      res.on('close', async () => {
        const data = await zyRedis.get(urlObj.href);
        if (data) {
          zyRedis.del(urlObj.href);
        }
        console.log('close', req.url);
      });
      this.routerS.router(req, res);
    });


    server.listen(tools.config('port'), function () {
      console.log('Server Started!');
      console.log('Listening: ' + tools.config('port') + ' port');

    });
  }



};

