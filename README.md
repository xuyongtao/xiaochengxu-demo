# 教育类微信小程序demo

## 概览

工具

- Nodejs+Express（创建本地HTTPS服务器）
- 微信小程序客户端 

创建本地HTTPS服务器

在Nodejs中，我们可以通过内置的https库，来实现HTTPS服务器。

首先，我们需要利用openssl生成证书文件：

1. 生成私钥key文件 $ openssl genres 1024 > /path/to/private.pem

2. 通过私钥文件生成CSR证书签名 $ openssl req -new -key /path/to/private.pem -out csr.pem

3. 通过私钥文件和CSR证书签名生成证书文件 $ openssl x509 -req -days 365 -in csr.pem -signkey /path/to/private.pem -out /path/to/file.crt

新生成了三个文件：

- private.pem: 私钥
- csr.pem: CSR证书签名
- file.crt: 证书文件

新建server.js文件

启动服务器 $ node server.js
