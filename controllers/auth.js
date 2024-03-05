import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

import { response } from 'express';
import { generarJWT } from '../helpers/generarJWT.js';
import { errorHandler } from '../helpers/errorHandler.js';
import { validateUser } from '../schemas-zod/userSchema.js';

export const createUser = async (req, res = response,next) => {

  const result = validateUser(req.body)
  if (result.error) return next(errorHandler(400, JSON.parse(result.error.message)))

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) return next(errorHandler(400, 'El email ya se encuentra registradro') )

    user =  new User(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();


    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    })

  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error.message))
  }
}


export const loginUser = async (req, res = response,next) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(400, ' Datos incorrectos'))

    // Confirmar los passwords
    const validPassword = bcryptjs.compareSync(password, user.password);

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
    return next(errorHandler(500, error.message))
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



