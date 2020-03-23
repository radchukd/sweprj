import React, { useState } from 'react';
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
    <form>
      <label>Add employee</label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email address"
        type="email"
        name="email"
        required
      />
      <button className='btn btn-primary' type="submit" onClick={submitForm}>Submit</button>
    </form>
  );
};

export default withContext(AddUserForm);
