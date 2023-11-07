import React, { useState, useContext, useEffect } from 'react';
import LoginImage from '../images/login.svg';
import axios from 'axios';
import Cookies from 'js-cookie';
import Input from '../components/Input';
import { userDataContext } from '../context/userDataContext';

export default function Login() {
  const { setName, setEmail, setPassword, setNotes } = useContext(userDataContext);
  const [fEmail, setFEmail] = useState('');
  const [fPassword, setFPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (Cookies.get('userTokenID')) {
      window.location.assign('/notes');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5500/auth/login', { email: fEmail, password: fPassword });
    const result = response.data;
    if (result.error) {
      setError(result.error);
    } else {
      Cookies.set('userTokenID', result.userToken);
      setName(result.user.name);
      setEmail(result.user.email);
      setPassword(result.user.password);
      setNotes(result.user.notes);
      window.location.reload();
    }
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="left"><img src={LoginImage} alt="login" /></div>
        <div className="right">
          <div className="heading">Your Thoughts, Our Canvas - Start Noting!</div>
          <div className="sub-heading">Login now to pause your journey and never miss a extraordinary idea!</div>
          <form type='POST' onSubmit={handleLogin}>
            <Input id='email' label='Email Address' type='email' required={true} value={fEmail} handleValue={setFEmail} />
            <Input id='password' label='Password' type='password' required={true} value={fPassword} handleValue={setFPassword} />
            <div className="error">{error}</div>
            <input type="submit" value="Login Now" />
          </form>
        </div>
      </div>
    </div>
  )
}
