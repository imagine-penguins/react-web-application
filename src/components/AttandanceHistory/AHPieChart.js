





import React, { useState } from 'react';
import "./AHPieChart.css";

import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from 'recharts';




const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy="0%" textAnchor="middle" fontSize="250%" className="AH-middle-text-value" fill={fill}>{`${payload.value}%`}</text>
      <text x={cx} y={cy} dy="10%" textAnchor="middle" className="AH-middle-text-name" fill="#5b78f891">{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};


function AHPieChart(props) {

  const [active, setactive] = useState(0);

  const colors = ["#ff6a81", "#2862ff", "#5289c9"];

  const data = [
    {name: "Present", value: props.data.present},
    {name: "Absent", value: props.data.absent},
    {name: "Leave", value: props.data.leave}
  ];

  const onPieEnter = (data, index) => {
    setactive(index);
  };

  return (
    <ResponsiveContainer className="pie-container-chart">
      <PieChart>
        <Pie
          activeIndex={active}
          activeShape={renderActiveShape}
          data={data}
          innerRadius="85%"
          outerRadius="100%"
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={() => onPieEnter}
        >
          {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
        }
        </Pie>
      </PieChart>
    </ResponsiveContainer>

  );
}


export default AHPieChart