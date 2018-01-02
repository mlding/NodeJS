function* reply(next) {
    var message = this.weixin

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            console.log('关注: ', message)
            this.body = 'Hi, 欢迎订阅'
        } else if (message.Event === 'unsubscribe') {
            console.log('取消关注')
            this.body = ''
        }
    } else if (message.MsgType === 'text') {
        var content = message.Content
        var reply = 'default reply'

        if (content === '1') {
            reply = 'reply 1111111111'
        } else if (content === '2') {
            reply = [{
                title: '微信公众平台',
                description: 'Official account services unavailable. Try again later',
                picUrl: 'https://mp.weixin.qq.com/debug/zh_CN/htmledition/images/bg/bg_logo1f2fc8.png',
                url: 'https://wechat.co.za/faq/error-official-account-services-unavailable-try-again-later/'
            }]
        }
        this.body = reply
    }

    yield next
}

module.exports = {
    reply
}
