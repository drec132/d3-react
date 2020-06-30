import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import aapl from './data/aapl.csv';
import {
  transition,
  scaleBand,
  scaleLinear,
  extent,
  line,
  curveMonotoneX,
} from 'd3';
import XYAxis from './component/axis/xy-axis';
import Line from './component/line/line';

export default function LinechartFx() {
  const [state, setState] = useState({
    lineData: [],
  });

  useEffect(() => {
    d3.csv(aapl).then(function (data) {
      let tData = [];
      data.forEach((tempData) => {
        return tData.push({
          name: tempData.date,
          value: parseFloat(tempData.close),
        });
      });
      setState({
        lineData: tData,
      });
    });
  }, []);

  const parentWidth = 800;
  const margins = { top: 20, right: 30, bottom: 30, left: 50 };

  const width = parentWidth - margins.left - margins.right;
  const height = 500 - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  const { lineData } = state;

  const xScale = scaleBand()
    .domain(lineData.map((d) => d.name))
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain(extent(lineData, (d) => d.value))
    .range([height, 0])
    .nice();

  const lineGenerator = line()
    .x((d) => xScale(d.name))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  return (
    <svg
      className='lineChartSvg'
      width={width + margins.left + margins.right}
      height={height + margins.top + margins.bottom}
    >
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        <XYAxis {...{ xScale, yScale, height, ticks, t }} />
        <Line
          data={lineData}
          xScale={xScale}
          yScale={yScale}
          lineGenerator={lineGenerator}
          width={width}
          height={height}
        />
      </g>
    </svg>
  );
}
