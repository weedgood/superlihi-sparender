module.exports = {
  port: process.env.SSR_PORT,
  renderLimit: process.env.RENDER_LIMIT,
  pageTimeout: 1000 * 10,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    ex: 60 * 60 * 24 * process.env.REDIS_CACHE_DAYS
  },
  puppeteer: {
    max: 3,//最多产生多少个 puppeteer 实例 。如果你设置它，请确保 在引用关闭时调用清理池。 pool.drain().then(()=>pool.clear())
    min: 1,//保证池中最少有多少个实例存活
    maxUses: 2048,//每一个 实例 最大可重用次数，超过后将重启实例。0表示不检验
    testOnBorrow: true,// 在将 实例 提供给用户之前，池应该验证这些实例。
    autostart: false,//是不是需要在 池 初始化时 初始化 实例
    idleTimeoutMillis: 1000 * 60 * 60,//如果一个实例 60分钟 都没访问就关掉他
    evictionRunIntervalMillis: 1000 * 60 * 3,//每 3分钟 检查一次 实例的访问状态
    start: {
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        "--disable-xss-auditor",//关闭 XSS Auditor
        '--no-first-run',
        '--no-sandbox',
        '–disable-extensions',
        '--no-zygote',
        '--single-process',
        '--disable-web-security',
        '--blink-settings=imagesEnabled=false',
        '--enable-features=NetworkService',
        '--disable-popup-blocking'
      ]
    }
  }
};