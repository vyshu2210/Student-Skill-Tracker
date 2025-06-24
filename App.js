
import './Final.js/App.css';

import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Skill from './Final.js/Skill';

import Login from './Final.js/Login';
import Home from './Final.js/Home';
import Signup from './Final.js/Signup';
import Homepage from './Final.js/Homepage';
import { useLocation } from 'react-router-dom';

import { BarChart } from 'recharts';

import './App.css';
import Weeklyproject from './Final.js/Weeklyproject';









function HomepageWrapper() {
  const location = useLocation();
  const rollno = location.state?.rollno || "";
  return <Homepage rollno={rollno} />;
}

function BarChartWrapper() {
  const location = useLocation();
  const rollno = location.state?.rollno || '';
  return <Weeklyproject rollno={rollno} />;
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/homepage' element={<Homepage />} />
      <Route path="/skill" element={<Skill />} />
      <Route path="/barchart" element={<BarChart />} />
      <Route path='/homepage' element={<HomepageWrapper />} />
      <Route path="/bargraph" element={<BarChartWrapper />} />

    </Routes>
      </BrowserRouter>
  );

}

export default App;