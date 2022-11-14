const { Router } = require('express');
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require('../controllers/users.controller');

const userRouter = Router();

userRouter.get('/', usersGet);

userRouter.post('/', usersPost);

userRouter.put('/:id', usersPut);

userRouter.delete('/', usersDelete);

module.exports = userRouter;
