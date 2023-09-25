const express = require('express');
const app = express();

// http://localhost:3000
// ejs pug

const database = [
  { id: 1, title: '글1'},
  { id: 2, title: '글2'},
  { id: 3, title: '글3'},  
];
// Number

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/database', function(req, res){
  res.send(database);
});

app.get('/database/:id', function(req, res){
  const id = req.params.id; // String 1
  const data = database.find((el) => el.id === Number(id));
  res.send(data)
});

// REST API
// 생성 : post
// 수정 : PUT, PATCH
// 삭제 : DELETE

app.post('/database', function(req, res){
  const title = req.body.title;
  database.push({
    id: database.length + 1,
    title,
  });
  res.send('값 추가가 정상적으로 완료되었습니다.');
});

app.put('/database', function(req, res){
  const id = req.body.id;
  const title = req.body.title;
  database[id - 1].title = title;
  res.send('값 수정이 정상적으로 완료되었습니다.');
});

app.delete('/database', function(req, res){
  const id = req.body.id;
  database.splice(id-1, 1);
  res.send('값 삭제가 정상적으로 완료되었습니다.');
});

app.listen(3000, () => {
  console.log('server on!');
});