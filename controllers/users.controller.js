const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
  const { limit, from } = req.query;
  const query = { status: true };

  /* here we have a problem and is that the promises execute in order, the first and then te second one
  so the solution here is using promise.all that execute both at the same time */
  /* const users = await User.find(query)
    .skip(+from)
    .limit(+limit);
  const total = await User.countDocuments(query); */

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(+from)
      .limit(+limit),
  ]);

  res.json({ total, users });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  // bcrypt pass
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //save in BBDD
  await user.save();

  res.json({
    msg: 'post API - controller',
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    // bcrypt pass
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
