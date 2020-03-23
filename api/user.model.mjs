/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      firstName: {
        type: String,
        default: ''
      },
      lastName: {
        type: String,
        default: ''
      },
      academicTitle: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
      },
      dateStarted: Date,
      jobTitle: {
        type: String,
        default: ''
      },
      department: {
        type: String,
        default: ''
      }
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);
export default User;
