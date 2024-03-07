
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { dbConnection } from "./database/conection.js";
import { eventRouter } from "./routes/event.js";
import { errorHandlerMiddleware } from "./middlewares/error.js";
import { patientRouter } from "./routes/patient.js";
import { runScheduledTask } from "./whatsapp/runCronTaks.js";
import { authRouter } from './routes/auth.js';
import { initializeClientWp } from './whatsapp/wpClient.js';
import { wpRouter } from './routes/wp.js';


dotenv.config()
dbConnection()
await initializeClientWp()

const app = express()
app.use(express.json())
app.use(cookieParser())

// app.use(cors())

//directorio publico
app.use(express.static('public'))

// rutas
app.use('/api/auth', authRouter)
app.use('/api/wp/', wpRouter)
app.use('/api/patient' , patientRouter)
app.use('/api/event',eventRouter)
app.use(errorHandlerMiddleware)


app.listen(process.env.PORT, () => {
  console.log(`escuchando en puerto ${process.env.PORT}`)
})



runScheduledTask()

// // Función para obtener los eventos y ejecutar la lógica periódicamente
// const runScheduledTask = async () => {
//   try {
//     const events = [];
//     const { data } = await axios.get('http://localhost:4000/api/event/');
//     events.push(...data.events);

//     const tomorrowEvents = getTomorrowEventsBeforeHour(events, 13);
//     const todayEvents = getTodayEventsAfterHour(events, 13);


//     cron.schedule('55 17 * * *', () => {
//       console.log("Ejecutando");
//       tomorrowEvents.forEach((event) => {
//         console.log(event);
//         const startDateTime = new Date(event.start);
//         const message = `*Recordatorio* mañana a las ${startDateTime.getUTCHours()}:00 horas. 🕒☺️`;
//         const data = {
//           message,
//           number: event.title
//         };
//         axios.post('http://localhost:3002/send-message', data)
//           .then(response => {
//             console.log('Mensaje enviado correctamente');
//           })
//           .catch(error => {
//             console.error('Error al enviar el mensaje:', error);
//           });
//       });
//     });

//     cron.schedule('00 18 * * *', () => {
//       console.log("Ejecutando");
//       todayEvents.forEach((event) => {
//         console.log(event);
//         const startDateTime = new Date(event.start);
//         const message = `*Recordatorio* hoy a las ${startDateTime.getUTCHours()}:00 horas. 🕒☺️`;
//         const data = {
//           message,
//           number: event.title
//         };
//         axios.post('http://localhost:3002/send-message', data)
//           .then(response => {
//             console.log('Mensaje enviado correctamente');
//           })
//           .catch(error => {
//             console.error('Error al enviar el mensaje:', error);
//           });
//       });
//     });

//   } catch (error) {
//     console.log(error);
//   }
// };


// Ejecutar la función periódicamente
// runScheduledTask();