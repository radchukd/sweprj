import React, { useState } from 'react';
import { withContext } from '../AppContext';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ text: '', type: 'danger' });

  setTimeout(() => {
    if (alert.text) {
      setAlert({ text: '', type: 'danger' });
      window.location.reload();
    }
  }, 3000)

  const submitForm = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => { setAlert({ text: 'Redirecting', type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  }

  return (
    <>
      { alert.text &&
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      }
      <form>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          name="email"
          required
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button className='btn btn-primary' type="submit" onClick={submitForm}>Submit</button>
      </form>
    </>
  );
};

export default withContext(Login);
