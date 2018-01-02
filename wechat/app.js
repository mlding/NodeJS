var Koa = require('koa')
var generator = require('./generator')
var config = require('./config')
var weixin = require('./weixin')

var app = new Koa()
app.use(generator(config.wechat, weixin.reply))

app.listen(8888)
console.log('app listen 8888')
