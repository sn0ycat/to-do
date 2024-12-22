import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <div>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodo(todo.id)} 
            />
            <span>{todo.title}</span>
            <button className="button delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    );
}

export default TodoItem;
