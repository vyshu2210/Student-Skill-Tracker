import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Skill() {
  const [rollno, setRollno] = useState('');
  const [skill, setSkill] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);

  const handleAddSkill = async () => {
  const totalHours = monday + tuesday + wednesday + thursday + friday + saturday + sunday;

  const response = await fetch('http://localhost:4000/add-skill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rollno, skill, proficiency,
      hours: totalHours,
      monday, tuesday, wednesday,
      thursday, friday, saturday, sunday
    })
  });
  const result = await response.json();
  alert(result.message);
};


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add Skill</h2>

      <input type="text" placeholder="Roll No" value={rollno} onChange={e => setRollno(e.target.value)} /><br />
      <input type="text" placeholder="Skill" value={skill} onChange={e => setSkill(e.target.value)} /><br />
      <input type="text" placeholder="Proficiency" value={proficiency} onChange={e => setProficiency(e.target.value)} /><br />

      <p>Enter Hours (Mon–Sun):</p>
      <input type="number" placeholder="Mon" value={monday} onChange={e => setMonday(Number(e.target.value))} />
      <input type="number" placeholder="Tue" value={tuesday} onChange={e => setTuesday(Number(e.target.value))} />
      <input type="number" placeholder="Wed" value={wednesday} onChange={e => setWednesday(Number(e.target.value))} />
      <input type="number" placeholder="Thu" value={thursday} onChange={e => setThursday(Number(e.target.value))} />
      <input type="number" placeholder="Fri" value={friday} onChange={e => setFriday(Number(e.target.value))} />
      <input type="number" placeholder="Sat" value={saturday} onChange={e => setSaturday(Number(e.target.value))} />
      <input type="number" placeholder="Sun" value={sunday} onChange={e => setSunday(Number(e.target.value))} /><br /><br />

      <button onClick={handleAddSkill} style={{ background: 'lightgreen', padding: '10px' }}>
        Add Skill
      </button>

      <br /><br />
      <Link to='/Login'>
        <input type="button" style={{ background: 'lightblue' }} value="Login/Register" />
      </Link>
    </div>
  );
}

export default Skill;