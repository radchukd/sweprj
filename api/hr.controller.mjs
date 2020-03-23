import { randomBytes } from 'crypto';
import User from './user.model.mjs';
import mailService from './mailer.mjs';
import { HR_TOKEN } from './secrets.mjs';

export const checkHrToken = async (req, res, next) => {
  const token = req.header('x-hr-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token provided.' });
  }

  if (token !== HR_TOKEN) {
    return res.status(401).json({ msg: 'Invalid token.' });
  }
  next();
};

export const sendEmail = async (req, res) => {
  const { email, subject, text } = req.body;

  mailService({ to: email, subject, text })
    .then(() => (
      res.status(200).json({ msg: 'Email was sent.' })
    ))
    .catch((error) => (
      res.status(500).json({ msg: error })
    ));
};

export const indexUser = async (_req, res) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

export const createUser = async (req, res) => {
  const { email } = req.body;
  const password = randomBytes(10).toString('hex');
  const user = new User({ email, password });

  User.findOne({ email: user.email }, (findError, existingUser) => {
    if (findError) {
      return res.status(500).json({ msg: findError });
    }
    if (existingUser) {
      return res.status(500).json({ msg: 'Email is already taken.' });
    }
    user.save((saveError) => {
      if (saveError) {
        return res.status(500).json({ msg: saveError });
      }

      mailService({ to: email, type: 'signup', password })
        .then(() => (
          res.status(200).json({ msg: `Confirmation email was sent to ${email}.` })
        ))
        .catch((error) => (
          res.status(500).json({ msg: error })
        ));
    });
  });
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;

  User.findOneAndRemove({ email }, (findError) => {
    if (findError) {
      return res.status(500).json({ msg: findError });
    }
    mailService({ to: email, type: 'deletion' })
      .then(() => (
        res.status(200).json({ msg: 'User was deleted.' })
      ))
      .catch((error) => (
        res.status(500).json({ msg: error })
      ));
  });
};
