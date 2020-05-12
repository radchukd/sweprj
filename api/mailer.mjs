import nodemailer from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  HR_EMAIL,
} from './secrets.mjs';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  }
});

const emails = {
  signup: ({ password }) => (
    {
      subject: 'Account registration',
      text: `Hello!\n
             You have been registered in our system.\n
             Use your email and '${password}' as password to login.`
    }
  ),
  update: ({ email }) => (
    {
      subject: 'Update request',
      text: `Hello!\n
             User(${email}) updated his profile.`
    }
  ),
  deletion: () => (
    {
      subject: 'Account update',
      text: `Hello!\n
             Your profile was updated.`
    }
  )
};

const mailService = (opts) => {
  const { to, type } = opts;
  const email = emails[type]
  const { subject, text } = email ? email(opts) : opts;

  return transporter.sendMail({
    from: HR_EMAIL,
    to,
    subject,
    text
  });
};

export default mailService;
