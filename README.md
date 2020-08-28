# ebook

## 项目介绍

这个项目是大二下的一门互联网开发基础的大作业，目标是做一个有完整的前后端的电子书城（前后端是分离的）。

## 后端（ebook-be）

使用spring框架开发，大致分为Dao，Service，Controller三层。数据库方面，用MySQL存储结构化的数据，如用户/书籍/订单；Mongodb存储非结构化数据，主要是书籍的图片和详情以及用户的头像。

## 前端

### Web端（ebook-react）

使用React框架开发，并使用了Ant Design的组件库

### 微信端（ebook-wechat）

使用了Vant的组件库，但在源码上进行了一些魔改

### Android端（ebook-mobile）

用React-native开发（y1s1，这框架的依赖是真的乱……）

## 总结

通过这个项目，我对Web开发有了一个比较基础的认识。但在安全验证/并发性能等方面却还需要学习。