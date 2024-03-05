import jwt from 'jsonwebtoken'
import { errorHandler } from '../helpers/errorHandler.js'

export const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token
  if (!token) return next(errorHandler('401', 'No hay token existente'))
  


  jwt.verify(token, process.env.SECRET_JWT_SEED, (err, user) => {
    if (err) return next(errorHandler('401', 'Error al validar el token'))
    req.uid = user.uid
    return next()
  })
}
