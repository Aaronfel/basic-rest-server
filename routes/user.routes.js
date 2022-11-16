const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const {
  isValidRol,
  emailExists,
  existsUserById,
} = require('../helpers/db-validators');
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require('../controllers/users.controller');

const userRouter = Router();

userRouter.get('/', usersGet);

userRouter.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check(
      'password',
      'password is required and should have more than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'email is not valid').isEmail().custom(emailExists),
    /* Automatically receives the first param of the custom function, 
    in this case the rol */
    // (role) => isValidRol(role)
    check('role').custom(isValidRol),
    //check('role', 'is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields,
  ],
  usersPost
);

userRouter.put(
  '/:id',
  [
    check('id', 'is not a valid id').isMongoId().custom(existsUserById),
    check('role').custom(isValidRol),
    validateFields,
  ],
  usersPut
);

userRouter.delete(
  '/:id',
  [
    check('id', 'is not a valid id').isMongoId().custom(existsUserById),
    validateFields,
  ],
  usersDelete
);

module.exports = userRouter;
