import React from 'react';
import {
  transition,
  scaleLinear,
  extent,
  line,
  curveMonotoneX,
  scaleUtc,
} from 'd3';
import XYAxis from './component/axis/xy-axis';
import Line from './component/line/line';

export default function LinechartFx(props) {
  const { chartHeight, chartWidth, data } = props;

  const margins = { top: 20, right: 30, bottom: 30, left: 50 };

  const width = chartWidth - margins.left - margins.right;
  const height = chartHeight - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  // Configuration for the axises
  const xScale = scaleUtc()
    .domain(extent(data, (d) => d.name))
    .range([margins.left, width - margins.right]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.value))
    .rangeRound([height - margins.bottom, margins.top])
    .nice();

  // Configuration for the chart
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
          data={data}
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
