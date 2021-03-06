import React from 'react';
import './App.css';
import LinechartFx from './LinechartFx';
import { Container, Typography, Card, CardContent } from '@material-ui/core';

function App() {
  return (
    <Container maxWidth='md'>
      <Card>
        <CardContent>
          <Typography variant='h5' color='initial'>
            Line Chart AAPL
          </Typography>
          <LinechartFx />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
