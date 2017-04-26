var express = require('express');
var app = express();
var mysql = require('./lib/dao/mysql/mysql');
var userDao = require('./lib/dao/userDao');
var roomDao = require('./lib/dao/roomDao');
var Token = require('../shared/token');
var secret = require('../shared/config/session').secret;

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/public');
  app.set('view options', {
    layout: false
  });
  app.set('basepath', __dirname + '/public');
});

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', {
    maxAge: oneYear
  }));
  app.use(express.errorHandler());
});

app.post('/login', function(req, res) {
  var msg = req.body;
  var username = msg.uname;
  var pwd = msg.pwd;
  console.log("login msg:", msg, "username:", username);
  if (!username || !pwd) {
    res.send({
      code: 500
    });
    return;
  }

  userDao.getUserByName(username, function(err, user) {
    if (err || !user) {
      console.log('username not exist!');
      res.send({
        code: 500
      });
      return;
    }
    console.log("user:", user);
    if (pwd !== user.password) {
      // TODO code
      // password is wrong
      console.log('password incorrect!');
      res.send({
        code: 501
      });
      return;
    }

    console.log(username + ' login!');
    res.send({
      code: 200,
      token: Token.create(user.id, Date.now(), secret),
      uid: user.id
    });
  });
});

app.post('/register', function(req, res) {
  //console.log('req.params');
  var msg = req.body;
  var uname = msg.uname;
  var pwd = msg.pwd;
  console.log("register msg:", msg);
  if (!uname || !pwd) {
    res.send({
      code: 500
    });
    return;
  }

  userDao.createUser(uname, pwd, '', function(err, user) {
    if (err || !user) {
      console.error(err);
      if (err && err.code === 1062) {
        res.send({
          code: 501
        });
      } else {
        res.send({
          code: 500
        });
      }
    } else {
      console.log('A new user was created! --' + msg.name);
      res.send({
        code: 200,
        token: Token.create(user.id, Date.now(), secret),
        uid: user.id
      });
    }
  });
});

app.post('/getroom', function(req, res) {
  var msg = req.body;
  var uid = msg.uid;
  console.log("getroom msg:", msg);
  if (!uid) {
    res.send({
      code: 500
    });
    return;
  }
  roomDao.getRoom(uid, function(err, roomid) {
    console.log('getRoom:', roomid);
    if (err) {
      res.send({
        code: 500
      });
    } else {
      res.send({
        code: 200,
        roomid: roomid
      });
    }
  });

});

app.post('/creatroom', function(req, res) {
  var msg = req.body;
  var uid = msg.uid;
  console.log("creatroom msg:", msg);
  if (!uid) {
    res.send({
      code: 500
    });
    return;
  }
  roomDao.createRoom(uid, function(err, roomid) {
    if (err) {
      res.send({
        code: 500
      });
    } else {
      res.send({
        code: 200,
        roomid: roomid
      });
    }
  });
});


mysql.init();


console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");

app.listen(3001);