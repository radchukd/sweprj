import axios from 'axios';

const HR_TOKEN_NAME = 'x-hr-token';
const USER_TOKEN_NAME = 'x-user-token';
export const HR_TOKEN = localStorage.getItem(HR_TOKEN_NAME);
export const USER_TOKEN = localStorage.getItem(USER_TOKEN_NAME);
const HR_TOKEN_HEADER = { 'x-hr-token': HR_TOKEN };
const USER_TOKEN_HEADER = { 'x-user-token': USER_TOKEN };

export const login = async (email, password) => {
  return axios({
    method: 'POST',
    url: '/api/user/login',
    data: { email, password }
  })
  .then((res) => {
    const { hrToken, userToken } = res.data;
    if (hrToken) {
      localStorage.setItem(HR_TOKEN_NAME, hrToken);
    } else {
      localStorage.setItem(USER_TOKEN_NAME, userToken); 
    }
  })
};

export const logout = () => {
  localStorage.removeItem(HR_TOKEN_NAME);
  localStorage.removeItem(USER_TOKEN_NAME);
  window.location.reload();
};

//hr

export const loadUsers = async () => {
  return axios({
    method: 'GET',
    url: '/api/hr/loadUsers',
    headers: HR_TOKEN_HEADER
  }).then(res => res.data.users);
};

export const deleteUser = async (email) => {
  return axios({
    method: 'POST',
    url: '/api/hr/deleteUser',
    headers: HR_TOKEN_HEADER,
    data: { email }
  }).then(res => res.data.msg);
}

export const addUser = async (email) => {
  return axios({
    method: 'POST',
    url: '/api/hr/addUser',
    headers: HR_TOKEN_HEADER,
    data: { email }
  }).then(res => res.data.msg);
};

export const sendEmail = async (email, subject, text) => {
  return axios({
    method: 'POST',
    url: '/api/hr/email',
    headers: HR_TOKEN_HEADER,
    data: { email, subject, text }
  }).then(res => res.data.msg);
};

//user

export const loadProfile = async () => {
  return axios({
    method: 'GET',
    url: '/api/user/profile',
    headers: USER_TOKEN_HEADER
  }).then(res => res.data.user);
};

export const updateProfile = async (profile) => {
  return axios({
    method: 'PUT',
    url: '/api/user/profile',
    headers: USER_TOKEN_HEADER,
    data: { profile }
  }).then(res => res.data.msg);
};