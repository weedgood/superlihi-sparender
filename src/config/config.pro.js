module.exports = {
  port: process.env.SSR_PORT,
  renderLimit: 10,
  pageTimeout: 1000 * 3,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    ex: 60 * 60 * 24 * process.env.REDIS_CACHE_DAYS
  },
  mobileRender: {
    name: 'iPhone X',
    userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: false,
      hasTouch: false,
      isLandscape: false,
    }
  },
  puppeteer: {
    max: 4,//最多产生多少个 puppeteer 实例 。如果你设置它，请确保 在引用关闭时调用清理池。 pool.drain().then(()=>pool.clear())
    min: 1,//保证池中最少有多少个实例存活
    maxUses: 1024,//每一个 实例 最大可重用次数，超过后将重启实例。0表示不检验
    testOnBorrow: true,// 在将 实例 提供给用户之前，池应该验证这些实例。
    autostart: false,//是不是需要在 池 初始化时 初始化 实例
    idleTimeoutMillis: 1000 * 60 * 6,//如果一个实例 60分钟 都没访问就关掉他
    evictionRunIntervalMillis: 1000 * 60 * 3,//每 3分钟 检查一次 实例的访问状态
    start: {
      headless: true,
      devtools: false,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // 创建临时文件共享内存
        '--disable-accelerated-2d-canvas', // canvas渲染
        '--disable-gpu', // GPU硬件加速
        '--no-zygote', // 禁止zygote进程fork子进程
        '--single-process', // 单进程
      ]
    }
  }
};