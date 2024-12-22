import React, { useState, useEffect } from 'react';
import TodoList from "../TodoList";

function TodoPage() {
  const [todos, setTodos] = useState(() => {
    // Извлекаем todos из локального хранилища или инициализируем с начальными значениями
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, title: 'Work out in the gym', completed: false },
      { id: 2, title: 'Read the book', completed: false },
    ];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Эффект для сохранения todos в локальное хранилище при каждом изменении
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true; // 'all'
  });

  const handleClick = () => {
        window.location.href = '/dnd'; // Укажите путь к целевой странице
  };

  return (
    <div>
      <h1>My To-Do list</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create new to-do..."
        />
        <button type="submit">Add</button>
      </form>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={handleClick}>Go to the DnD To-Do list</button>
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </div>
  );
}

export default TodoPage;