var fs = require('fs')
var Promise = require('bluebird')
var xml2js = require('xml2js')
var template = require('./template')

function readFileAsync(fpath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(fpath, encoding, (err, content) => {
            if (err) reject(err)
            else resolve(content)
        })
    })
}


function writeFileAsync(fpath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fpath, content, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}

function parseXMLAsync(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, {
            trim: true
        }, (err, content) => {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

function formatMessage(result) {
    var message = {}
    content = result.xml;
    if (typeof content === 'object') {
        var keys = Object.keys(content)
        for (var i = 0; i < keys.length; i++) {
            var item = content[keys[i]]
            var key = keys[i]

            if (!(item instanceof Array) || !item.length) {
                continue
            }

            if (item.length === 1) {
                var val = item[0]
                if (typeof val === 'object') {
                    message[key] = formatMessage(val)
                } else {
                    message[key] = (val || '').trim()
                }
            } else {
                message[key] = []
                for (var j = 0; j < item.length; jj++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message
}

function tpl(content, message) {
    var info = {}
    var type = 'text'
    var fromUserName = message.FromUserName
    var toUserName = message.ToUserName

    if (Array.isArray(content)) {
        type = 'news'
    }

    type = content.type || type
    info.content = content
    info.createTime = new Date().getTime()
    info.msgType = type
    info.toUserName = fromUserName
    info.fromUserName = toUserName

    return template.compiled(info)
}

module.exports = {
    readFileAsync,
    writeFileAsync,
    parseXMLAsync,
    formatMessage,
    tpl
}
