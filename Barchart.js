import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Barchart({ data }) {
  return (
    <div style={{ width: '100%', height: 400, marginTop: '30px' }}>
      <h3 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
        Weekly Skill Hours
      </h3>

      {data && data.length > 0 ? (
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No data available</p>
      )}
    </div>
  );
}

export default Barchart;