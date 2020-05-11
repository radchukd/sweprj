import React, { useState } from 'react';
import s from '../css/login.module.css';
import Logo from '../icon/logo.png';
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
  }, 1000)

  const submitForm = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => { setAlert({ text: 'Redirecting', type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  }

  return (
    <div className={s.container}>
      { alert.text &&
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      }
      <div className={s.wrapper}>
        <img className={s.logo} src={Logo} alt="logo"/>
        <form className={s.login}>
          <input
            className={s.item}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            name="email"
            required
          />
          <input
            className={s.item}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <button className='btn btn-primary' type="submit" onClick={submitForm}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default withContext(Login);
