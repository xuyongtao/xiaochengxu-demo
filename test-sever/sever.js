// var express = require('express')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

// var app = express()

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   	console.log(req.file.path);
// 	res.end('done');
// })

// app.listen(3000)

var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = {
	key: privateKey, 
	cert: certificate
};
var bodyParser = require('body-parser');


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

app.post('/get-recomment-teachers', jsonParser, function(req, res) {
	var page = parseInt(req.body.page || 2);

	if (req.protocol === 'https') {
		res
			.status(200)
			.send({
				meta: {
					code: 0,
					msg: '获取推荐老师成功'
				},
				data: {
					currentPage: page,
					totalPage: 10,
					teachers: [{
						"role": "teacher",
						"id": 1,
						"name": "推荐老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10,
						"courseName": "数学",
						"coursePrice": 120,
						"courseType": "1对1"    
					}, {
						"role": "studio",
						"id": 1,
						"name": "推荐机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5,
						"courseName": "钢琴",
						"coursePrice": 220,
						"courseType": "大班"    
					}, {
						"role": "teacher",
						"id": 1,
						"name": "推荐老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10,
						"courseName": "数学",
						"coursePrice": 120,
						"courseType": "1对1"    
					}, {
						"role": "studio",
						"id": 1,
						"name": "推荐机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5,
						"courseName": "钢琴",
						"coursePrice": 220,
						"courseType": "大班"    
					}, {
						"role": "teacher",
						"id": 1,
						"name": "推荐老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10,
						"courseName": "数学",
						"coursePrice": 120,
						"courseType": "1对1"    
					}, {
						"role": "studio",
						"id": 1,
						"name": "推荐机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5,
						"courseName": "钢琴",
						"coursePrice": 220,
						"courseType": "大班"    
					}, {
						"role": "teacher",
						"id": 1,
						"name": "推荐老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10,
						"courseName": "数学",
						"coursePrice": 120,
						"courseType": "1对1"    
					}, {
						"role": "studio",
						"id": 1,
						"name": "推荐机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5,
						"courseName": "钢琴",
						"coursePrice": 220,
						"courseType": "大班"    
					}] 	
				}
			})
	}
})

app.post('/get-hot-teachers', jsonParser, function(req, res) {
	var page = parseInt(req.body.page || 2);

	if (req.protocol === 'https') {
		res
			.status(200)
			.send({
				meta: {
					code: 0,
					msg: '获取热门老师成功'
				},
				data: {
					currentPage: page,
					totalPage: 10,
					teachers: [{
						"role": "teacher",
						"id": 1,
						"name": "热门老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10,
						"courseName": "数学",
						"coursePrice": 120,
						"courseType": "1对1"    
					}, {
						"role": "studio",
						"id": 1,
						"name": "热门机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5,
						"courseName": "钢琴",
						"coursePrice": 220,
						"courseType": "大班"    
					}] 	
				}
			})
	}
})

app.post('/get-fav-teachers', jsonParser, function(req, res) {
	var page = parseInt(req.body.page || 2);

	if (req.protocol === 'https') {
		res
			.status(200)
			.send({
				meta: {
					code: 0,
					msg: '获取收藏的老师成功'
				},
				data: {
					currentPage: page,
					totalPage: 10,
					teachers: [{
						"role": "teacher",
						"id": 1,
						"name": "热门老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10
					}, {
						"role": "studio",
						"id": 1,
						"name": "热门机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5   
					}, {
						"role": "teacher",
						"id": 1,
						"name": "热门老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10
					}, {
						"role": "studio",
						"id": 1,
						"name": "热门机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5   
					}, {
						"role": "teacher",
						"id": 1,
						"name": "热门老师",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 10
					}, {
						"role": "studio",
						"id": 1,
						"name": "热门机构",
						"avatar": "/images/avatar-demo.png",
						"intro": "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
						"teachingAge": 5   
					}] 	
				}
			})
	}
})

