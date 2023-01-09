const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(createProxyMiddleware('/baiduApi', 
    {
      target: "https://fanyi-api.baidu.com",
      changeOrigin: true,
      pathRewrite: {
        '^/baiduApi': ''
      }
    }))
}
