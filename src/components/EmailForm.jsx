import React, { useState } from 'react';
import { withContext } from '../AppContext';

const EmailForm = ({ email, sendEmail, deleteUser, setAlert }) => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    sendEmail(email, subject, text)
      .then((msg) => { setAlert({ text: msg, type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  }

  const handleClick = () => {
    deleteUser(email)
      .then((msg) => { setAlert({ text: msg, type: 'success' }); })
      .catch((error) => {
        setAlert({ text: error.response.data.msg, type: 'danger' });
      });
  }

  return (
    <>
      <h6>
        {email}
        <span className="badge badge-secondary" data-toggle="modal" data-target="#emailForm">
          Email
        </span>
        <span className="badge badge-secondary" value={email} onClick={e => handleClick()}>
          Delete 
        </span>
      </h6>

      <div className="modal fade" id="emailForm" tabIndex="-1" role="dialog" aria-labelledby="emailFormLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title" id="emailFormLabel">Email employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Subject"
                  type="text"
                  name="Subject"
                  required
                />
                <br />
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Text"
                  required
                >
                  {text}
                </textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={submitForm}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withContext(EmailForm);
