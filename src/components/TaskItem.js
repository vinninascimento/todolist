import React from 'react';

const TaskItem = ({ task, markTaskAsCompleted, openEditModal }) => {
  return (
    <li
      onClick={() => markTaskAsCompleted(task.id)}
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
    >
      {task.title} - {task.description}
      <button onClick={() => openEditModal(task)}>Edit</button>
    </li>
  );
};

export default TaskItem;