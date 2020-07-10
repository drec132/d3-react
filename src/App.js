import React, { useEffect, useState } from 'react';
import './App.css';
import LinechartFx from './LinechartFx';
import { csv, utcParse } from 'd3';
import { Container, Typography, Card, CardContent } from '@material-ui/core';
import aapl from './data/aapl.csv';

function App() {
  const [state, setState] = useState({
    lineData: [],
  });

  useEffect(() => {
    const parseDate = utcParse('%Y-%m-%d');
    csv(aapl)
      .then(function (data) {
        let tData = [];
        data.forEach((tempData) => {
          return tData.push({
            name: parseDate(tempData.date),
            value: parseFloat(tempData.close),
          });
        });
        setState({
          lineData: tData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth='md'>
      <Card>
        <CardContent>
          <Typography variant='h5' color='initial'>
            Line Chart AAPL
          </Typography>
          {/* Since referencing this component we can pass WIDTH, HEIGHT */}
          <LinechartFx
            chartHeight={500}
            chartWidth={800}
            data={state.lineData}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
