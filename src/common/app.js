require('dotenv').config();

const Tools = require('./tools');
const Logger = require('./logger/logger');
const path = require('path');
const Service = require('./service.js');
const Controller = require('./controller');
const Entry = require('./entry');
const Redis = require('ioredis');

async function start(env) {
    global.tools = new Tools(env);
    global.logger = new Logger(env);
    if (tools.config('redis')) {
        global.zyRedis = new Redis(tools.config('redis'));
    }
    global.zuoyan = {
        env,
        ROOT_PATH: path.resolve(__dirname, '../../'),
        RUNTIME_PATH: path.resolve(__dirname, '../../runtime'),
        SRC_PATH: path.resolve(__dirname, '../../src'),
        db: {},
        Service,
        Controller,
        Entry
    };

  try {
    const Index = require('../index');
    const index = new Index(env);
    await index.start(env);
  } catch (e) {
    logger.error(e);
  }
}

const App = {
  start
};

module.exports = App;