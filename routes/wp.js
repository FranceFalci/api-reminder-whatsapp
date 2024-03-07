import { Router } from 'express'
import { sendMessage } from '../controllers/wp.js'

export const wpRouter = Router()

wpRouter.post('/message', sendMessage)
