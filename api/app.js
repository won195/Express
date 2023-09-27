const express = require('express'); // Express 모듈을 불러옵니다.
const app = express(); // Express 앱 인스턴스를 생성합니다.
const mysql = require('mysql2');
// http://localhost:3000
// ejs pug

const database = [ // 데이터베이스를 배열로 선언합니다.
  { id: 1, title: '글1'},
  { id: 2, title: '글2'},
  { id: 3, title: '글3'},  
];
// Number

app.use(express.json()); // JSON 파싱 미들웨어를 사용합니다.
app.use(express.urlencoded({ extended: false})); // URL 인코딩 파싱 미들웨어를 사용합니다.

app.get('/', function (req, res) { // 루트 경로에 대한 GET 요청을 처리합니다.
  res.sendFile(__dirname + '/views/index.html'); // index.html 파일을 응답으로 보냅니다.
});

app.get('/database', function(req, res){ // '/database' 경로에 대한 GET 요청을 처리합니다.
  res.send(database); // 데이터베이스의 내용을 응답으로 보냅니다.
});

app.get('/database/:id', function(req, res){ // '/database/:id' 경로에 대한 GET 요청을 처리합니다.
  const id = req.params.id; // 요청에서 id 파라미터를 가져옵니다.
  const data = database.find((el) => el.id === Number(id)); // id와 일치하는 데이터를 찾습니다.
  res.send(data) // 찾은 데이터를 응답으로 보냅니다.
});

// REST API
// 생성 : post
// 수정 : PUT, PATCH
// 삭제 : DELETE

app.post('/database', function(req, res){ // '/database' 경로에 대한 POST 요청을 처리합니다.
  const title = req.body.title; // 요청 본문에서 title을 가져옵니다.
  database.push({ // 데이터베이스에 새로운 항목을 추가합니다.
    id: database.length + 1,
    title,
  });
  res.send('값 추가가 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.put('/database', function(req, res){ // '/database' 경로에 대한 PUT 요청을 처리합니다.
  const id = req.body.id; // 요청 본문에서 id를 가져옵니다.
  const title = req.body.title; // 요청 본문에서 title을 가져옵니다.
  database[id - 1].title = title; // 데이터베이스의 해당 항목을 수정합니다.
  res.send('값 수정이 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.delete('/database/:id', function(req, res){ // '/database' 경로에 대한 DELETE 요청을 처리합니다.
  const id = req.params.id; // 요청 본문에서 id를 가져옵니다.
  database.splice(id-1, 1); // 데이터베이스의 해당 항목을 삭제합니다.
  res.send('값 삭제가 정상적으로 완료되었습니다.'); // 응답으로 메시지를 보냅니다.
});

app.listen(3000, () => { // 서버를 시작하고, 3000번 포트에서 수신 대기합니다.
  console.log('server on!'); // 서버가 시작되면 콘솔에 메시지를 출력합니다.
}); 
