const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const registerUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado',
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor, hable con el administrador',
    });
  }
};

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con ese correo',
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      });
    }

    res.status(200).json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor, hable con el administrador',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
