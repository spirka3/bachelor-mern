import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true // fixme
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'defaultAvatar'
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = model('user', UserSchema);

export default User;
