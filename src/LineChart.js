import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './component/axis/xy-axis';
import Line from './component/line/line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import aapl from './data/aapl.csv';
import * as d3 from 'd3';

export default class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [{ name: '2007-03-25', value: 50.4 }],
    };
  }

  updateData = () => {
    const tempD = this.state.data;
    d3.csv(aapl).then((d) => {
      d.map((tempData) => {
        return tempD.push({
          name: tempData.date,
          value: parseFloat(tempData.close),
        });
      });
    });

    this.setState({
      data: tempD,
    });
  };

  render() {
    const { data } = this.state;

    const parentWidth = 800;
    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 500 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, (d) => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <div>
        <button onClick={this.updateData}>Update data</button>
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
      </div>
    );
  }
}
