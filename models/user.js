const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

/*
  This function overrites the base function of mongoose, 
  here i delete the user properties that i dont want, 
  when i bring it from the BBDD 
*/
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
module.exports = model('User', UserSchema);
