import React, { useState } from 'react';
import { Grid, Typography, Button, Box, Select, MenuItem } from '@mui/material';
import Task from './Task';
import TaskForm from './TaskForm';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddTask = () => {
    setOpenForm(true);
    setSelectedTask(null);
  };

  const handleSaveTask = (task) => {
    if (selectedTask) {
      setTasks(tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...task } : t)));
    } else {
      const newTask = {
        ...task,
        id: Date.now(),
        createdAt: Date.now(),
        column: 'backlog',
      };
      setTasks([...tasks, newTask]);
    }
    setOpenForm(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed', column: 'completed' } : task
      )
    );
  };

  const handleChangeColumn = (taskId, column) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, column } : task)));
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
    setOpenForm(false);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getFilteredTasks = () => {
    if (filterStatus === 'all') {
      return tasks;
    } else {
      return tasks.filter((task) => task.column === filterStatus);
    }
  };

  const sortTasks = (tasks) => {
    const compareFunction = (a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      } else {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    };

    return tasks.sort(compareFunction);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Nova Tarefa
      </Button>

      <Box mt={2} mb={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Data de Criação
            </Typography>
            <Button onClick={handleSortOrderToggle}size="medium" variant="contained" color="primary">
              {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
             <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Select size="small"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="in-progress">Pendentes</MenuItem>
              {tasks.every((task) => task.column === 'completed') ? (
                <MenuItem value="completed">Concluídas</MenuItem>
              ) : (
                <MenuItem value="completed">Concluídas</MenuItem>
              )}
            </Select>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom>
            Backlog
          </Typography>
          {sortTasks(
            getFilteredTasks().filter((task) => task.column === 'backlog')
          ).map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onComplete={handleCompleteTask}
              onChangeColumn={handleChangeColumn}
              availableColumns={['backlog', 'in-progress', 'completed']}
            />
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom>
            Em Progresso
          </Typography>
          {sortTasks(
            getFilteredTasks().filter((task) => task.column === 'in-progress')
          ).map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onComplete={handleCompleteTask}
              onChangeColumn={handleChangeColumn}
              availableColumns={['backlog', 'in-progress', 'completed']}
            />
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom>
            Concluído
          </Typography>
          {sortTasks(
            getFilteredTasks().filter((task) => task.column === 'completed')
          ).map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onComplete={handleCompleteTask}
              onChangeColumn={handleChangeColumn}
              availableColumns={['in-progress', 'completed']}
            />
          ))}
        </Grid>
      </Grid>
      <TaskForm open={openForm} onSave={handleSaveTask} onClose={handleCloseForm} task={selectedTask} />
    </div>
  );
};

export default KanbanBoard;
