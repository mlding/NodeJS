var path = require('path')
var util = require('./util')

var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
    wechat: {
        appID: 'wxc53b117dcfa75851',
        appSecret: '132d82c96b932011c086a67ac7c9fa85',
        token: 'powerdingdingwechatapplication',
        getAccessToken: () => util.readFileAsync(wechat_file),
        saveAccessToken: data => {
            data = JSON.stringify(data)
            util.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config
