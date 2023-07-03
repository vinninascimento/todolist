import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';

const Task = ({ task, onEdit, onComplete }) => {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <Typography variant="h6">{task.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Criado em: {new Date(task.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} color="primary" size="small">
            Editar
          </Button>
          {task.status === 'backlog' && (
            <Button onClick={handleComplete} color="secondary" size="small">
              Concluir
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default Task;