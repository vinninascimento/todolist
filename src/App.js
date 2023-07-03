import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <KanbanBoard />
    </Container>
  );
}

export default App;