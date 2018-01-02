var ejs = require('ejs')
var heredoc = require('heredoc')

var template = heredoc(() => {
    /*
  <xml>
 <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
 <CreateTime><%= createTime %></CreateTime>
 <MsgType><![CDATA[<%= msgType %>]]></MsgType>

 <% if(msgType === 'text') { %>
 <Content><![CDATA[<%= content %>]]></Content>
 <% } else if(msgType === 'image') {%>
 <Image>
<MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
</Image>
 <% } else if(msgType === 'voice') {%>
<Voice>
<MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
</Voice>
 <% } else if(msgType === 'video') {%>
 <Video>
<MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
<Title><![CDATA[title]]></Title>
<Description><![CDATA[description]]></Description>
</Video>
 <% } else if(msgType === 'news') {%>
 <ArticleCount><%= content.length %></ArticleCount>
<Articles>
<% content.forEach((item) => {%>
<item>
<Title><![CDATA[<%= item.title %>]]></Title>
<Description><![CDATA[<%= item.description %>]]></Description>
<PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
<Url><![CDATA[<%= item.url %>]]></Url>
</item>
 <% })%>
</Articles>
 <% }%>

 <MsgId>1234567890123456</MsgId>
 </xml>
  */
})

var compiled = ejs.compile(template)
module.exports = {
    compiled
}
