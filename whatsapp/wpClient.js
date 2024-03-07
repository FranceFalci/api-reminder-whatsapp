import wpb, { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

let client = null

export const initializeClientWp = async () => {
  client = new Client({
    authStrategy: new wpb.LocalAuth(),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    }
  })

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
  })

  client.on('loading_screen', (porcentaje, mensaje) => {
    console.log(`Cargando: ${porcentaje} - ${mensaje}`)
  })

  client.on('authenticated', () => {
    console.log('Autenticado!')
  })

  client.on('auth_failure', (msg) => {
    console.error('Error de autenticación', msg)
  })

  client.on('ready', () => {
    console.log('Client is ready!')
  })

  await client.initialize()
}

export const sendMessageWp = async (number, message) => {
  try {
    if (!client) throw new Error('Client not initialized')
    number = number + '@c.us'
    const response = await client.sendMessage(number, message)
    // console.log('mensaje enviado')
    return response
  } catch (error) {
    const errorMessage = `Error al enviar mensaje a ${number}`
    console.error(errorMessage, error)
    throw new Error(errorMessage)
  }
}
