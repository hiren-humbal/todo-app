import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add task
  const handleClick = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  // Delete task
  const handleDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  // Move task up 
  const handleMoveUp = (index) => {
      const newTasks = [...tasks];
    if (index === 0) {
      const firstTask = newTasks.shift();
      newTasks.push(firstTask);
      setTasks(newTasks);
    } else if (index > 0) {
      newTasks.splice(index - 1, 0, newTasks.splice(index, 1)[0]);
      setTasks(newTasks);
    }
  };

  // Move task down
  const handleMoveDown = (index) => {
    if (index === tasks.length - 1) {
      const newTasks = [...tasks];
      const lastTask = newTasks.pop();
      newTasks.unshift(lastTask);
      setTasks(newTasks);
    } else if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      newTasks.splice(index + 1, 0, newTasks.splice(index, 1)[0]);
      setTasks(newTasks);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        />
        <button className="todo-button" onClick={handleClick}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">{task}</span>
            <div className="todo-buttons">
              <button className="move-button" onClick={() => handleMoveUp(index)}>
                ↑
              </button>
              <button className="move-button" onClick={() => handleMoveDown(index)}>
                ↓
              </button>
              <button className="todo-delete" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
