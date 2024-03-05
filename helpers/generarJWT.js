import { sign } from 'jsonwebtoken';

export const generarJWT = (uid, name) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name };

    sign(payload, process.env.SECRET_JWT_SEED, {
      
    }, (err, token) => {

      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      }

      resolve(token);

    })


  })
}



export default {
  generarJWT
}

