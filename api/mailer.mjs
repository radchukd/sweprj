import nodemailer from 'nodemailer';
import { GMAIL_EMAIL, GMAIL_PASS } from './secrets.mjs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASS
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
  const { subject, text } = type ? emails[type](opts) : opts;

  return transporter.sendMail({
    from: GMAIL_EMAIL,
    to,
    subject,
    text
  });
};

export default mailService;
