import React, { useState } from 'react';
import s from '../css/AddUsers.module.css';
import { withContext } from '../AppContext';

const AddUserForm = ({ addUser, setAlert }) => {
  const [email, setEmail] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    addUser(email)
      .then((msg) => { setAlert({ text: msg, type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  };
  
  return (
    <div className={s.add}>
      <form>
        <label htmlFor="add" className={s.label}>Add employee</label>
        <input
          className={s.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          name="email"
          id="id"
          required
        />
        <button className={`${s.butn}`} type="submit" onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};

export default withContext(AddUserForm);
