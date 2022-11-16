const Role = require('../models/role');
const User = require('../models/user');

const isValidRol = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The rol ${role} is not registered in the BBDD`);
  }
};

const emailExists = async (email = '') => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error('This email is already registered');
  }
};

const existsUserById = async (id) => {
  const existsId = await User.findById(id);
  if (!existsId) {
    throw new Error('This id dont belong to any user');
  }
};

module.exports = {
  isValidRol,
  emailExists,
  existsUserById,
};
