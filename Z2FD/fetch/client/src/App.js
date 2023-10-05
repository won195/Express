import { useEffect, useState } from 'react';

function App() {
  const [ todoList, setTodoList ] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:4000/api/todo')
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }
  useEffect (() => {fetchData()}, []);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    fetch('http://localhost:4000/api/todo',{
      method: 'Post',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() => fetchData());
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input name='text'/>
        <input name='done' type='checkbox' />
        <input type='submit' value='추가' />
      </form>
      {todoList.map((todo) => (
        <div key={todo.id} style={{display: 'flex' }}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'Y' : 'N'}</div>
        </div>
      ))}
    </div>
  );
}

export default App;

