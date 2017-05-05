## 低仿山寨飞行陀螺仪
---
* 快速使用：  
将代码复制到本地之后，执行  
`npm install`  
等待npm下载`express`和`socket.io`这两个包，下载完成后执行`node`命令  
`node index`  
然后浏览器访问：[http://localhost:3000/](http://localhost:3000/)；

* 注意事项：
1. 页面产生的二维码是基于当前电脑的ip地址的一个url，如果你的手机和电脑不是在同一局域网下，将无法访问到node服务。
2. 如果电脑和手机处于同一局域网下，且wifi是由电脑产生（诸如猎豹wifi），请手动查询电脑开启wifi的ip地址，并且进入`/app/index.js`里面，将代码改为：
```javascript
    app.get('/getIp', (req, res) => {
        res.send(192.168.0.1)//你查询到的ip地址
    })
```
3. node服务端使用了部分es6写法，如果发现开启服务错误，可能是node版本过低语法不支持所致，请升级node版本