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
var Lodash      = require('lodash');
var Promise     = require('promise');
var Sequelize   = require('sequelize');
var app 	    = require('express')();
var fs 		    = require('fs');
var http 	    = require('http');
var https 	    = require('https');
var privateKey  = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = {
	key: privateKey, 
	cert: certificate
};
var bodyParser = require('body-parser');

// 数据库连接配置
var mysqlConfig = {
	name: 'qmjy-local',
	host: '192.168.10.10',
	port: 3306,
	user: 'homestead',
	password: 'secret'
}
// end数据库连接配置

function buildMysqlConnetion() {
	console.log('创建数据库连接完成');
	return new Sequelize(mysqlConfig.name, mysqlConfig.user, mysqlConfig.password, {
		timezone: '+08:00',
		host: mysqlConfig.host,
		port: mysqlConfig.port,
		dialect: 'mysql',
		pool: {
			maxIdleTime: 20000,
			maxConnections: 100
		},
		logging: false
	});
}

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
	var page = parseInt(req.body.page || 1);

	if (req.protocol === 'https') {
		var sequelize = buildMysqlConnetion();
		var queryHotStudioesPromise = sequelize.query(`
			select 
				studios.id,
				lessons.id as lessonId,
				lessons.label as courseName,
				greatest(lessons.in_door_price, lessons.online_price, lessons.other_price, lessons.out_door_price) as coursePrice,
				lessons.lesson_type as courseType,
				studios.company as name,
				concat('http://qmin91.com/file/', users.head_uri) as avatar,
				'千教万教教人求真，千学万学学做真人' as intro,
				'studio' as role
			from studios
			join users on 
				users.id = studios.user_id
			left join lessons on
				lessons.user_id = users.id
			where
				studios.is_hot = 3
				and lessons.is_recommend = 1
		`);
		var queryHotTeachersPromise = sequelize.query(`
			select 
				teachers.id,
				lessons.id as lessonId,
				lessons.label as courseName,
				greatest(lessons.in_door_price, lessons.online_price, lessons.other_price, lessons.out_door_price) as coursePrice,
				lessons.lesson_type as courseType,
				users.name as name,
				concat('http://qmin91.com/file/', users.head_uri) as avatar,
				'千教万教教人求真，千学万学学做真人' as intro,
				'teacher' as role,
				'4' as teachingAge,
				studios.company as studio
			from teachers
			join users on 
				users.id = teachers.user_id
			left join lessons on
				lessons.user_id = users.id
			left join studio_teacher on
				studio_teacher.teacher_id = teachers.id
			left join studios on
				studios.id = studio_teacher.studio_id
			where
				teachers.is_hot = 3
				and lessons.is_recommend = 1
		`)

		Promise
			.all([queryHotStudioesPromise, queryHotTeachersPromise])
			.then(function(result) {
				sequelize.close();
				console.log('关闭数据库连接完成');

				res.status(200)
					.send({
						meta: {
							code: 0,
							msg: '获取推荐机构成功'
						},
						data: {
							currentPage: page,
							totalPage: 10,
							teachers: result[0][0].concat(result[1][0])	
						}	
					})
				
			}, function() {
				sequelize.close();
				console.log('关闭数据库连接完成');

				res.status(200)
					.send({
						meta: {
							code: 1,
							msg: '获取推荐机构失败'
						}
					})
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

app.get('/get-cats', function(req, res) {
	if (req.protocol === 'https') {
		var sequelize = buildMysqlConnetion();
		var queryCatsPromise = sequelize.query(`
			select 
				id,
				label,
				father_id as fatherId
			from cats
		`);

		Promise
			.resovle(queryCatsPromise)
			.then(function(result) {
				sequelize.close();
				console.log('关闭数据库连接完成');

				var data = result[0] || [];
				var cats = [];
				var catsObject = Lodash.keyBy('id');// 转为对象好处理

			})
	}		
})

