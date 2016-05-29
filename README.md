# nodejs-express-mongodb-url-translate
本项目是参考[Creating a URL Shortener with NodeJs, Express, and MongoDB ](https://coligo.io/create-url-shortener-with-node-express-mongo/)进行开发和重构的，仅供自己学习使用，。

本项目融合了node.js的基本使用，使用express搭建基本平台，同时使用mongodb作为数据库，涉及到的知识点有：

1. 使用express控制控制路由，完成HTTP的get、post动作，同时还使用了ajax进行数据交互。
2. mongodb的基本操作，使用mongoose模块将nodejs和mongodb连接。
3. express对url的解析

使用本项目前，需要在mongodb数据库中的counters集合中插入以下内容：

	db.counters.insert({ _id: 'url_count', seq: 1 })

安装依赖：

	npm install 

运行项目:

	node app.js

在`http://localhost:3000`访问项目

效果预览[demo](https://shrinkr.herokuapp.com)