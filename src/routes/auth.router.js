const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields.middlewares');

const router = Router();

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no tiene un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check(
      'password',
      'La contraseña debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no tiene un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check(
      'password',
      'La contraseña debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

module.exports = router;
