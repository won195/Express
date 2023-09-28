const express = require('express'); // Express 모듈을 불러옵니다.
const app = express(); // Express 앱 인스턴스를 생성합니다.
const mysql = require('mysql2/promise');
// http://localhost:3000
// ejs pug

let connection ;


app.use(express.json()); // JSON 파싱 미들웨어를 사용합니다.
app.use(express.urlencoded({ extended: false})); // URL 인코딩 파싱 미들웨어를 사용합니다.

app.get('/', function (req, res) { // 루트 경로에 대한 GET 요청을 처리합니다.
  res.sendFile(__dirname + '/views/index.html'); // index.html 파일을 응답으로 보냅니다.
});

app.get('/database', async function(req, res){ // '/database' 경로에 대한 GET 요청을 처리합니다.
  const [ rows, fields ] = await connection.execute(`SELECT * FROM user`);
  res.send(rows); // 데이터베이스의 내용을 응답으로 보냅니다.
});

app.get('/database/:id', async function(req, res){ // '/database/:id' 경로에 대한 GET 요청을 처리합니다.
  const id = req.params.id; // 요청에서 id 파라미터를 가져옵니다.
  const [ row, fields] = await connection.execute(
    `SELECT * FROM user Where id=?`,
    [id]
  )
  res.send(rows[0]); // 찾은 데이터를 응답으로 보냅니다.
});

// REST API
// 생성 : post
// 수정 : PUT, PATCH
// 삭제 : DELETE

app.post('/database', async function(req, res){ // '/database' 경로에 대한 POST 요청을 처리합니다.
  const { name, age } = req.body;
  const [ rows, fields ] = await connection.execute(
    `INSERT INTO user(name, age) VALUES(?, ?)`,
    [name,age]
  );
  res.send('값 추가가 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.put('/database', async function(req, res){ // '/database' 경로에 대한 PUT 요청을 처리합니다.
  const { id, name, age } = req.body;
  const [ rows, fields ] = await connection.execute(
    `UPDATE user SET name=?, age=? WHERE id=?`,
    [name,age,id]
  );
  res.send('값 수정이 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.delete('/database/:id', function(req, res){ // '/database' 경로에 대한 DELETE 요청을 처리합니다.
  const id = req.params.id; // 요청 본문에서 id를 가져옵니다.
  database.splice(id-1, 1); // 데이터베이스의 해당 항목을 삭제합니다.
  res.send('값 삭제가 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.listen(3000, () => { // 서버를 시작하고, 3000번 포트에서 수신 대기합니다.
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myapp',
    password: 'root',
  });  
  console.log('server on!'); // 서버가 시작되면 콘솔에 메시지를 출력합니다.
}); 
