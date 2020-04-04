import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { data } from "./analysisConfig";
import { API_URL } from "../../constants/urls";

function BarChartComponent({ courseId }) {
  const [maxScore, setMaxScore] = useState(100);

  useEffect(() => {
    fetchAnalysis(courseId);
  }, [courseId]);

  const fetchAnalysis = (course) => {
    fetch(API_URL + "/analysis?id=" + course).then((response) =>
      console.log(response.json())
    );
  };

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
    <ResponsiveContainer width="90%" height={450}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, maxScore + 10]} />
        <Tooltip />
        <Legend />
        {/* <ReferenceLine y={maxScore} label="Number of Students" stroke="red" /> */}
        <Bar dataKey="score" fill="#8884d8" label={renderCustomBarLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartComponent;
