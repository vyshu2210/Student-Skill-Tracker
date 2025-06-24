import React, { useState, useEffect, useCallback } from 'react';
import Barchart from './Barchart';
import Weeklyproject from './Weeklyproject';
import { useLocation } from 'react-router-dom';

function Homepage() {
  const location = useLocation();

  const [skills, setSkills] = useState([]);
  const [rollno, setRollno] = useState('');
  const [skill, setSkill] = useState('');
  const [proficiency, setProficiency] = useState('Beginner');
  const [message, setMessage] = useState('');
  const [showCharts, setShowCharts] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  // ✅ Fetch skill data from backend
  const fetchSkills = useCallback(async () => {
    if (!rollno) return;

    try {
      const res = await fetch(`http://localhost:4000/charts/${rollno}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSkills(data);
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  }, [rollno]);

  // ✅ Set rollno from login state
  useEffect(() => {
    if (location.state?.rollno) {
      setRollno(location.state.rollno);
    }
  }, [location]);

  // ✅ Fetch skills only after rollno is set
  useEffect(() => {
    fetchSkills();
  }, [rollno, fetchSkills]);

  const handleAdd = async () => {
    const totalHours =
      parseInt(monday || 0) +
      parseInt(tuesday || 0) +
      parseInt(wednesday || 0) +
      parseInt(thursday || 0) +
      parseInt(friday || 0) +
      parseInt(saturday || 0) +
      parseInt(sunday || 0);

    const res = await fetch('http://localhost:4000/add-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rollno,
        skill,
        proficiency,
        hours: totalHours,
        monday: parseInt(monday) || 0,
        tuesday: parseInt(tuesday) || 0,
        wednesday: parseInt(wednesday) || 0,
        thursday: parseInt(thursday) || 0,
        friday: parseInt(friday) || 0,
        saturday: parseInt(saturday) || 0,
        sunday: parseInt(sunday) || 0,
      }),
    });

    const data = await res.json();
    setMessage(data.message || 'Skill added');
    fetchSkills();
  };

  const handleDelete = async () => {
    await fetch('http://localhost:4000/delete-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rollno }),
    });

    setMessage('Skill deleted');
    fetchSkills();
  };

  const handleUpdate = async (skill) => {
    const updatedSkill = { ...skill, isworking: 1 };

    await fetch('http://localhost:4000/update-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSkill),
    });

    setMessage('Skill updated');
    fetchSkills();
  };
  const handleBarChartClick = async () => {
  if (!rollno || !skill) {
    alert("Please select a Roll No and Skill");
    return;
  }

  const response = await fetch(`http://localhost:4000/charts/${rollno}`);
  const data = await response.json();

  // Get the selected skill entry
  const selected = data.find((s) => s.skill_name === skill);
  if (!selected) {
    alert("No data found for this skill");
    return;
  }

  const chartData = [
    { day: 'Monday', hours: selected.monday },
    { day: 'Tuesday', hours: selected.tuesday },
    { day: 'Wednesday', hours: selected.wednesday },
    { day: 'Thursday', hours: selected.thursday },
    { day: 'Friday', hours: selected.friday },
    { day: 'Saturday', hours: selected.saturday },
    { day: 'Sunday', hours: selected.sunday }
  ];

  setChartData(chartData);
  setShowCharts(true);
};


  const uniqueRollnos = [
    ...new Set([...skills.map((s) => s.rollno), rollno].filter(Boolean)),
  ];
  const handleSingleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
  if (!confirmDelete) return;

  await fetch('http://localhost:4000/delete-one-skill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  setMessage('Skill deleted successfully');
  fetchSkills(); // refresh data
};

  return (
    
    <div style={{ padding: '30px' }}>
      <div style={{ textAlign: 'right' }}>
  <button
    onClick={() => window.location.href = '/login'}
    style={{
      padding: '10px 16px',
      fontSize: '14px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginBottom: '20px'
    }}
  >
    Logout
  </button>
</div>

      <h2 className="page-title">Skill Management Dashboard</h2>

      <div className="form-section">
  <select onChange={(e) => setRollno(e.target.value)} value={rollno}>
    <option value="">Select Roll No</option>
    {uniqueRollnos.map((r) => (
      <option key={r} value={r}>{r}</option>
    ))}
  </select>

  <input type="text" placeholder="Skill" value={skill} onChange={(e) => setSkill(e.target.value)} />

  <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
    <option>Beginner</option>
    <option>Intermediate</option>
    <option>Expert</option>
  </select>

  <input type="number" placeholder="Mon" value={monday} onChange={(e) => setMonday(e.target.value)} />
  <input type="number" placeholder="Tue" value={tuesday} onChange={(e) => setTuesday(e.target.value)} />
  <input type="number" placeholder="Wed" value={wednesday} onChange={(e) => setWednesday(e.target.value)} />
  <input type="number" placeholder="Thu" value={thursday} onChange={(e) => setThursday(e.target.value)} />
  <input type="number" placeholder="Fri" value={friday} onChange={(e) => setFriday(e.target.value)} />
  <input type="number" placeholder="Sat" value={saturday} onChange={(e) => setSaturday(e.target.value)} />
  <input type="number" placeholder="Sun" value={sunday} onChange={(e) => setSunday(e.target.value)} />

  <button onClick={handleAdd}>Add/Update Skill</button>
  <button onClick={handleDelete} style={{ backgroundColor: '#dc3545' }}>Delete Roll</button>
</div>

{message && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{message}</p>}


      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'center',
          border: '1px solid #ccc',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th rowSpan="2">Rollno</th>
            <th rowSpan="2">Skill</th>
            <th rowSpan="2">Proficiency</th>
            <th colSpan="8">Hours</th>
            <th rowSpan="2">Status</th>
            <th rowSpan="2">Actions</th>
          </tr>
          <tr style={{ backgroundColor: '#eee' }}>
            {[
              'Total',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
            ].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skills
            .filter((s) => rollno === '' || s.rollno === rollno)
            .map((s, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: s.isworking ? '#eaffea' : '#ffeaea',
                }}
              >
                <td>{s.rollno}</td>
                <td>{s.skill_name}</td>
                <td>{s.proficiency}</td>
                <td>
                  {s.monday +
                    s.tuesday +
                    s.wednesday +
                    s.thursday +
                    s.friday +
                    s.saturday +
                    s.sunday}
                </td>
                <td>{s.monday}</td>
                <td>{s.tuesday}</td>
                <td>{s.wednesday}</td>
                <td>{s.thursday}</td>
                <td>{s.friday}</td>
                <td>{s.saturday}</td>
                <td>{s.sunday}</td>
                <td>{s.isworking === 1 ? 'Active' : 'Deleted'}</td>
                <td className="action-buttons">
  <button onClick={() => handleUpdate(s)}>
    {s.isworking === 1 ? 'Save' : 'Restore'}
  </button>
  <button onClick={() => handleSingleDelete(s.id)} style={{ marginLeft: '8px', color: 'red' }}>
    Delete
  </button>
</td>

              </tr>
            ))}
        </tbody>
      </table>

      <div
        className="button-wrapper"
        style={{ textAlign: 'center', marginTop: '20px' }}
      >
        <button className="button" onClick={handleBarChartClick}>
          View Bar Chart
        </button>
      </div>

      {showCharts && chartData && (
        <>
          <Barchart data={chartData} />
          <Weeklyproject rollno={rollno} />
        </>
      )}
    </div>
  );
}

export default Homepage;