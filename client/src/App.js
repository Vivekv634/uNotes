import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { userDataContext } from './context/userDataContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState([]);
  return (
    <userDataContext.Provider value={{name, setName, email, setEmail, password, setPassword, notes, setNotes}}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </userDataContext.Provider>
  );
}

export default App;
