import React, { useState, useEffect } from 'react';

function App() {
  // 初期状態をローカルストレージから取得
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  // タスクが変更されるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 新しいタスクを追加する関数
  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  // タスクの完了状態を切り替える関数
  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
    );
  }

  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  // 編集モードを開始する関数
  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditInput(text);
  };

  // 編集を完了する関数
  const saveEdit = () => {
    setTodos(
      todos.map((todo, i) =>
      i === editingIndex ? { ...todo, text: editInput } : todo
    )
    );
    setEditingIndex(null);
    setEditInput('');
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        <li>Todoをクリックして完了状態にできます</li>
        <li>編集をクリックしてTodoを編集できます</li>
      </ul>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Todoを入力" />
      <button onClick={addTodo}>追加</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
              <input type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
              <button onClick={saveEdit}>保存</button>
              </>
            ) : (
              <span onClick={() => toggleComplete(index)} style={{textDecoration: todo.completed ? 'line-through': 'none', 'cursor': 'pointer'}}>{todo.text}</span>
            )}
            {/* <span onClick={() => toggleComplete(index)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', 'cursor': 'pointer' }}>{todo.text}</span> */}
            <button onClick={() => startEditing(index, todo.text)}>編集</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App;