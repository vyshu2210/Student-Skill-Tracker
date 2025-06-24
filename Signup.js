
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !rollno || !password || !confirmPassword) {
      alert('Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, rollno, password })
      });

      const data = await response.json();
      alert(data.message);

      if (data.message === 'Signup successful') {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
      <h2>Signup</h2>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label>Roll number</label>
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="Enter rollno"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <input
        type="button"
        value="Signup"
        onClick={handleSignup}
        style={{
          width: '100%',
          backgroundColor: 'lightgreen',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          cursor: 'pointer'
        }}
      />
    </div>
  );
}

export default Signup;
