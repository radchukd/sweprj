import React, { useState, useEffect } from 'react';
import { withContext } from '../AppContext';
import EmailForm from './EmailForm';
import AddUserForm from './AddUserForm';

const Dashboard = ({ logout, loadUsers }) => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ text: '', type: 'danger' });

  setTimeout(() => {
    if (alert.text) {
      setAlert({ text: '', type: 'danger' });
      window.location.reload();
    }
  }, 3000)

  useEffect(() => {
    const load = async () => {
      setUsers(await loadUsers());
    };
    load();
  }, [loadUsers]);

  return (
    <div>
      {alert.text &&
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.text}
        </div>
      }
      <br />
      <AddUserForm setAlert={setAlert} />
      Employees:
      { users.map((user) => (
        <div key={user.email}>
          <EmailForm email={user.email} setAlert={setAlert} />
          {Object.keys(user.profile).map(key => <div key={key}>{user.profile[key]}</div>)}
        </div>
      ))
      }
      <button className='btn btn-secondary' onClick={logout}>Logout</button>
    </div>
  )
}

export default withContext(Dashboard);
