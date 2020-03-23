import jwt from 'jsonwebtoken';
import User from './user.model.mjs';
import mailService from './mailer.mjs';
import {
  JWT_SECRET,
  JWT_EXPIRY,
  HR_EMAIL,
  HR_PASS,
  HR_TOKEN
} from './secrets.mjs';

export const checkUserToken = async (req, res, next) => {
  const token = req.header('x-user-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json({ msg: 'Token is not valid.' });
    }
    req.body.token = decoded;
    next();
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === HR_EMAIL && password === HR_PASS) {
    return res.status(200).json({ hrToken: HR_TOKEN });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: 'User does not exist.' });
      }

      user.comparePasswords(password)
        .then(() => {
          jwt.sign({ id: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY },
            (signError, token) => {
              if (signError) {
                return res.status(500).json({ msg: signError });
              }
              return res.status(200).json({ userToken: token });
            });
        })
        .catch(() => res.status(400).json({ msg: 'Invalid password.' }));
    });
};

export const getProfile = async (req, res) => {
  const { token: { id } } = req.body;

  User.findById(id, (findError, user) => {
    if (findError) {
      return res.status(500).json({ msg: findError });
    }
    const { profile } = user;
    profile.email = user.email;

    return res.status(200).json({ user: profile });
  });
};

export const updateProfile = async (req, res) => {
  const { token: { id }, profile } = req.body;

  User.findById(id, (findError, user) => {
    if (findError) {
      return res.status(500).json({ msg: findError });
    }

    user.profile = { ...profile };

    user.save((saveError) => {
      if (saveError) {
        return res.status(500).json({ msg: saveError });
      }
      mailService({ to: HR_EMAIL, type: 'update', email: user.email })
        .then(() => (
          res.status(200).json({ msg: 'Profile was updated.' })
        ))
        .catch((error) => (
          res.status(500).json({ msg: error })
        ));
    });
  });
};
