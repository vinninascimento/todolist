import React from 'react';
import { List, ListItem, ListItemText, Checkbox } from '@material-ui/core';

const TaskList = ({ tasks, markTaskAsCompleted, onEditTask }) => {
  const handleToggle = (taskId) => {
    markTaskAsCompleted(taskId);
  };

  const handleEdit = (task) => {
    onEditTask(task);
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => handleToggle(task.id)}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <button onClick={() => handleEdit(task)}>Editar</button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;