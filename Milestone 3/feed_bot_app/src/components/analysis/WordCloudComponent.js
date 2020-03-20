import React, { useState } from "react";
import { Chart, Transform, Cloud } from "rumble-charts";
import { series } from "./analysisConfig";

function BarChartComponent() {
  const [maxScore, setMaxScore] = useState(100);

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`value: ${value}`}</text>
    );
  };

  return (
    <Chart width={600} height={600} series={series} minY={0}>
      <Transform method="transpose">
        <Cloud
          font="sans-serif"
          minFontSize={24}
          maxFontSize={72}
          padding={2}
        />
      </Transform>
    </Chart>
  );
}
export default BarChartComponent;
