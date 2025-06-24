
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useLocation } from 'react-router-dom';

function Login() {
  
  const [name, setName] = useState('');
 const [rollno,setRollno]=useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollno, password })
  });

  const text = await response.text();  
  console.log('Raw response:', text); 
  const data = JSON.parse(text);     

  alert(data.message);

  if (data.message === 'Login successful') {
    navigate('/homepage', { state: { rollno } });
  }
} catch (error) {
  console.error('Login failed:', error);
  alert('Something went wrong. Please try again.');
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
      <h2 style={{ marginBottom: '20px' }}>Login</h2>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Roll Number</label>
        <input 
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="Enter your roll number"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <input 
        type="button" 
        value="Login"
        onClick={handleLogin}
        style={{
          width: '100%',
          backgroundColor: 'lightgreen',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          cursor: 'pointer'
        }}
      />

      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        <p>Don't have an account? <a href="/signup" style={{ color: 'blue' }}>Sign up</a></p>
        
      </div>
    </div>
  );
}

export default Login;
