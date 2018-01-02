var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util')


var prefix = 'https://api.weixin.qq.com/cgi-bin'
var api = {
    access_token: prefix + '/token?grant_type=client_credential'
}

class Wechat {
    constructor(opts) {
        var that = this
        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
        this.getAccessToken()
            .then(data => {
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    return that.updateAccessToken()
                }

                if (this.isValidAccessToken()) {
                    Promise.resolve(data)
                } else {
                    return that.updateAccessToken()
                }
            })
            .then(data => {
                this.access_token = data.access_token
                this.expires_in = data.expires_in

                that.saveAccessToken(data)
            })
    }

    isValidAccessToken(data) {
        if (!data || !data.access_token || !data.expires_in) {
            return false
        }

        var access_token = data.access_token
        var expires_in = data.expires_in
        var now = (new Date().getTime())

        return (now < expires_in)
    }

    updateAccessToken() {
        var appID = this.appID
        var appSecret = this.appSecret
        var url = api.access_token + '&appid=' + appID + '&secret=' + appSecret

        return new Promise((resolve, reject) => {
            request({
                    url: url,
                    json: true
                })
                .then(response => {
                    var data = response.body
                    var now = (new Date().getTime())
                    var expires_in = now + (data.expires_in - 20) * 1000

                    data.expires_in = expires_in
                    resolve(data)
                })
        })
    }

    reply() {
        var content = this.body
        var message = this.weixin
        var xml = util.tpl(content, message)

        this.status = 200
        this.type = 'application/xml'
        this.body = xml
    }
}

module.exports = Wechat
