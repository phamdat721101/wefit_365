import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue }) => {
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: maxValue - value },
  ];

  const COLORS = ['#FFA500', '#FFC0CB'];

  return (
    <div style={{ width: '400px', height: '200px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '16px' }}>
          <span style={{fontWeight: 'bold', fontSize: '24px'}}>{value}</span>/{maxValue} steps
        </div>
        <button style={{
          backgroundColor: '#FF0000',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <div style={{
            width: 0,
            height: 0,
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderLeft: '18px solid white',
            marginLeft: '5px'
          }}></div>
        </button>
      </div>
    </div>
  );
};

export default GaugeChart;