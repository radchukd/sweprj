import express from 'express';
import {
  checkHrToken,
  sendEmail,
  indexUser,
  createUser,
  deleteUser
} from './hr.controller.mjs';
import {
  checkUserToken,
  login,
  getProfile,
  updateProfile
} from './user.controller.mjs';

const appRouter = express.Router();

appRouter.post(
  '/hr/email',
  checkHrToken,
  sendEmail
);

appRouter.get(
  '/hr/loadUsers',
  checkHrToken,
  indexUser
);

appRouter.post(
  '/hr/addUser',
  checkHrToken,
  createUser
);

appRouter.post(
  '/hr/deleteUser',
  checkHrToken,
  deleteUser
);

appRouter.post(
  '/user/login',
  login
);

appRouter.get(
  '/user/profile',
  checkUserToken,
  getProfile
);

appRouter.put(
  '/user/profile',
  checkUserToken,
  updateProfile
);

export default appRouter;
