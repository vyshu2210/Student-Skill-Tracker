import React, { useEffect, useState } from 'react';



function Weeklyproject({ rollno }) {
  const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  fontWeight: '600',
  color: '#2c3e50'
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  fontSize: '14px',
  color: '#333'
};
  const [weeklySkills, setWeeklySkills] = useState([]);

  useEffect(() => {
    const fetchWeekly = async () => {
      if (!rollno) return;

      try {
        const res = await fetch(`http://localhost:4000/charts/${rollno}`);
        const data = await res.json();
        setWeeklySkills(data);
      } catch (err) {
        console.error('Error fetching weekly project data:', err);
      }
    };

    fetchWeekly();
  }, [rollno]);

  return (
    <div style={{ padding: '30px 10px', maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
        Weekly Project Summary
      </h3>

      {weeklySkills.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '6px',
            overflow: 'hidden'
          }}
        >
          <thead style={{ backgroundColor: '#e3f2fd' }}>
            <tr>
              <th style={thStyle}>Skill</th>
              <th style={thStyle}>Proficiency</th>
              <th style={thStyle}>Mon</th>
              <th style={thStyle}>Tue</th>
              <th style={thStyle}>Wed</th>
              <th style={thStyle}>Thu</th>
              <th style={thStyle}>Fri</th>
              <th style={thStyle}>Sat</th>
              <th style={thStyle}>Sun</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {weeklySkills.map((s, index) => {
              const total =
                s.monday +
                s.tuesday +
                s.wednesday +
                s.thursday +
                s.friday +
                s.saturday +
                s.sunday;
              return (
                <tr key={index}>
                  <td style={tdStyle}>{s.skill_name}</td>
                  <td style={tdStyle}>{s.proficiency}</td>
                  <td style={tdStyle}>{s.monday}</td>
                  <td style={tdStyle}>{s.tuesday}</td>
                  <td style={tdStyle}>{s.wednesday}</td>
                  <td style={tdStyle}>{s.thursday}</td>
                  <td style={tdStyle}>{s.friday}</td>
                  <td style={tdStyle}>{s.saturday}</td>
                  <td style={tdStyle}>{s.sunday}</td>
                  <td style={tdStyle}><strong>{total}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No weekly data found.</p>
      )}
    </div>
  );
}

export default Weeklyproject;
