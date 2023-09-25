const express = require('express');
const app = express();

const database= [{ id: 1, username: 'abc', password: 'abc'}];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
  res.send('test');
});

app.get('/users', (req, res) => {
  res.send(database);
})

app.post('/signup', (req, res) => {
  const { username, password, age, birthday } = req.body;
  database.push({
    username,
    password,
    age,
    birthday,
  })
  res.send('success');
});

app.listen(3000, () => {
  console.log('server on!');
}); 