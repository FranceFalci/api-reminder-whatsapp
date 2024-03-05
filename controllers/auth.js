import { response } from 'express';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import Usuario, { findOne } from '../models/Usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';
import { errorHandler } from '../helpers/errorHandler.js';
import User from '../models/User.js';

export const createUser = async (req, res = response,next) => {

  const { email, password } = req.body;

  try {
    let user = await findOne({ email });

    if (user) return next(errorHandler('400') , 'El email ya se encuentra registradro')

    user = new User(req.body);

    // Encriptar contraseña
    const salt = genSaltSync();
    user.password = hashSync(password, salt);


    await user.save();

    // Generar JWT
    // const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error)
    return next(errorHandler('500'), error.message)
  }
}


export const loginUser = async (req, res = response,next) => {

  const { email, password } = req.body;

  try {

    const user = await findOne({ email });

    if (!user) return next(errorHandler('400', ' Datos incorrectos'))

    // Confirmar los passwords
    const validPassword = compareSync(password, user.password);

    if (!validPassword) return next(errorHandler('400' , ' Datos incorrectos'))

    // Generar JWT
    const token = await generarJWT(user.id, user.name);
    // const { password: pass, ...rest } = validUser._doc
    res.status(200).cookie('access_token', token, {
      httpOnly: false
    }).json({
      ok: true,
      name: user.name,
    })



  } catch (error) {
    console.log(error);
    return next(errorHandler('500', error.message))
  }

}


export const revalidarToken = async (req, res = response) => {

  const { uid, name } = req;

  // Generar JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  })
}



