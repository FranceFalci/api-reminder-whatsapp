import { Router } from 'express';
import { createUser, loginUser } from '../controllers/auth.js';

export const authRouter = Router()


authRouter.post('/new',createUser);

authRouter.post('/',loginUser);


// router.get('/renew', validarJWT, revalidarToken);


