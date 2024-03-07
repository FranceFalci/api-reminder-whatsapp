import { logger } from '../logger/logger.js'
import { sendMessageWp } from '../whatsapp/wpClient.js'

export const sendMessage = async (req, res) => {
  const { number, message } = req.body

  try {
    
    const result = await sendMessageWp(number, message)

    if (result) {
      console.log(`mensaje enviado a ${number}`)
      res.status(200).json({ succes: true, message: `mensaje enviado a ${number}` })
    } else {
      res.status(400).json({ succes: false, message: `ERROR al enviar  mensaje a ${number}` })
      // console.log( `Error al enviar mensaje a ${ number }` )
      logger.error(`ERROR al enviar  mensajea ${number}`)
    }
  } catch (error) {
    logger.error(`ERROR al enviar  mensajea ${number}`)
    res.status(500).json({ message: error.mensaje })
  }
}

// TODO PROBAR DE NUEVO LA PETICION
