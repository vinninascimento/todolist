import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';

const TaskForm = ({ open, onSave, onClose, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState('');
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumn(task.column);
    }
  }, [task]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleColumnChange = (event) => {
    setColumn(event.target.value);
  };

  const handleSave = () => {
    if (title.trim() === '') {
      setTitleError(true);
      return;
    }

    const updatedTask = {
      ...task,
      title: title,
      description: description,
      column: column,
    };
    onSave(updatedTask);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setColumn('');
    setTitleError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          label="Título"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          autoFocus
          margin="normal"
          required
          error={titleError}
          helperText={titleError && 'O título é obrigatório'}
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Select
          value={column}
          onChange={handleColumnChange}
          fullWidth
          displayEmpty
          margin="normal"
          required
        >
          <MenuItem value="" disabled>
            Selecione uma coluna
          </MenuItem>
          <MenuItem value="backlog">Backlog</MenuItem>
          <MenuItem value="in-progress">Em Progresso</MenuItem>
          <MenuItem value="completed">Concluído</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">
          {task ? 'Salvar' : 'Adicionar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;