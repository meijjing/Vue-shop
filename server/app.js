const express = require('express');
const app = express();
const session = require('express-session');
// 파일 시스템 디렉토리 접근
const fs = require('fs');



// 세션 
app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 //쿠기 유효시간 1시간
  }
}));

// request 받기
app.use(express.json({
  limit: '50mb'
}));

// 서버 연결
const server = app.listen(3000, () => {
  console.log('Server started. port 3000.');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경시 재시작 없이 반영되도록 함.');
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
});

// db 접속 정보
const db = {
  database: "Vue-shop-dev",
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "mariadb1234"
};

const dbPool = require('mysql').createPool(db);



// 로그인
app.post('/api/login', async (request, res) => {
  request.session['email'] = 'jing@gmail.com';
  res.send('ok');
  // try {
  //   await req.db('signUp', request.body.param);
  //   if (request.body.param.length > 0) {
  //     for (let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
  //     res.send(request.body.param[0]);
  //   } else {
  //     res.send({
  //       error: "Please try again or contact system manager."
  //     });
  //   }
  // } catch (err) {
  //   res.send({
  //     error: "DB access error"
  //   });
  // }
});


// 로그아웃
app.post('/api/logout', async (request, res) => {
  request.session.destroy();
  res.send('ok');
});


// 이미지 업로드
app.post('/upload/:productId/:type/:fileName', async (request, res) => {

  let {
    productId,
    type,
    fileName
  } = request.params;

  const dir = `${__dirname}/uploads/${productId}`;
  const file = `${dir}/${fileName}`;

  if (!request.body.data) return fs.unlink(file, async (err) => res.send({
    err
  }));
  const data = request.body.data.slice(request.body.data.indexOf(';base64,') + 8);
  
  if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 폴더 없으면 만들어 주기

  
  fs.writeFile(file, data, 'base64', async (error) => {
    await req.db('productImageInsert', [{
      product_id: productId,
      type: type,
      path: fileName
    }]);

    if (error) {
      res.send({
        error
      });
    } else {
      res.send("ok");
    }
  });
});

app.get('/download/:productId/:fileName', (request, res) => {
  const {
    productId,
    type,
    fileName
  } = request.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
  if (!fs.existsSync(filepath)) res.send(404, {
    error: 'Can not found file.'
  });
  else fs.createReadStream(filepath).pipe(res);
});

app.post('/apirole/:alias', async (request, res) => {
  if (!request.session.email) {
    return res.status(401).send({
      error: 'You need to login.'
    });
  }

  try {
    res.send(await req.db(request.params.alias));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});



// api/...지정 특정주소가 아닌 이외의 주소로 연결될 시
app.post('/api/:alias', async (request, res) => {

  // if(!request.session.email) {
  //   return res.status(401).send({error: 'You need to login first.'});
  // }

  try {
    res.send(await req.db(request.params.alias, request.body.param, request.body.where));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});

const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
};