# nodejsConnectMongodb
* learn how to connect mongodb by using nodejs

### 学习如何使用nodejs连接mongodb
1. 首先，你得有个数据库，先到mongodb官网上直接下载安装包进行安装
2. 安装完之后,在命令行里面cd到安装目录的bin文件里面，输入：  
    ```cmd  
    
    $.mongod --dbpath db(这个db是你指定的存放数据的地方)  
    ```
3. 然后，命令行里面会提示你访问一个 http://localhost:27017 的url，  
   浏览器访问之，如果浏览器正常显示的话，说明我们已经成功开启  
   数据库了,对了，此时千万别把命令行窗口给关了，不然下面这些步骤即使做了也没用。
4. 接下来，就是nodejs的活了，首先可以创建一个文件夹用于存放我们的  
   demo，同样的，命令行cd到该文件夹，我们来安装一个连接mongodb的包：  
   ```cmd     
   $.npm install mongodb
   ```
  安装完成后，我们就可以在demo文件夹里面新建一个叫mongodb.js文件，里面使用：
  ```javascript   
  
  var mongo=require('mongodb');
  var host='localhost';
  var port=27017;
  var server=new mongo.Server(host,port,{auto_reconnect:true});
  var db=new mongo.Db('node-mongo-examples',server,{safe:true});
  ```
  具体的代码请查看mongodb.js文件，里面我已经做了简单的封装。更加详细的api请参考官方文档
5. 还记得以前学习ajax的时候使用的接口吗？这次我们反过来，使用ajax来访问后台，通过后台连接数据库   
  我在app.js里面定义了三个接口：`/`、`/postComment`和`/comment`。  
  * 当用户访问`/`这个路由的时候，我们把带有ajax请求test.html发送给用户，让用户看到test.html里面的内容
  * 当test.html打开后，里面执行ajax请求，请求`/comment`，获取数据库里面全部评论数据
  * 当点击test.html里面的提交按钮后，发送ajax请求到`/postComment`，用post方法将评论提交
6. 具体代码请查看app.js，里面是一个简单地用nodejs开启服务器并且处理接口的代码，在开着mongodb数据库的那个命令行窗口的同时，再开一个命令行窗口，cd到demo文件夹，执行：  
  ```cmd  
  
   $. node app.js
  ```
然后浏览器访问：http://localhost:8080/ (我的代码里面监听的是8080端口)  
接下来开始回忆一下以前学习ajax的激动吧。。。
