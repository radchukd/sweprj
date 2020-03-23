import React, { useState, useEffect } from 'react';
import { withContext } from '../AppContext';

const Profile = ({ logout, loadProfile, updateProfile }) => {
  const [user, setUser] = useState({ profile: null });
  const [alert, setAlert] = useState({ text: '', type: 'danger' });

  setTimeout(() => {
    if (alert.text) {
      setAlert({ text: '', type: 'danger' });
      window.location.reload();
    }
  }, 3000)

  useEffect(() => {
    const load = async () => {
      const profile = await loadProfile();
      setUser({ profile });
    };
    load();
  }, [loadProfile]);

  const normalize = (string) => {
    const match = string.match(/[A-Z]/);
    if (match) {
      const index = string.indexOf(match[0]);
      return string.charAt(0).toUpperCase()
        + string.slice(1, index)
        + ' ' + string.slice(index);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const setValue = (e) => {
    const updated = { ...user.profile }
    updated[e.target.name] = e.target.value
    setUser({ profile: updated })
  };

  const submitForm = (e) => {
    e.preventDefault();

    updateProfile(user.profile)
      .then((msg) => { setAlert({ text: msg, type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  };

  return (
    <>
      {alert.text &&
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      }
      <form>
        {user.profile && Object.keys(user.profile).map((key) => (
          <React.Fragment key={key}>
            <input
              value={user.profile[key]}
              onChange={e => setValue(e)}
              placeholder={normalize(key)}
              type="text"
              name={key}
            />
            <br />
          </React.Fragment>
        ))}
        <button className='btn btn-primary' type="submit" onClick={submitForm}>Submit</button>
      </form>
      <button className='btn btn-secondary' onClick={logout}>Logout</button>
    </>
  )
}

export default withContext(Profile);
