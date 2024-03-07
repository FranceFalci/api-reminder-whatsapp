import axios from "axios";
import cron from 'node-cron';
import { getTomorrowEventsBeforeHour } from "../helpers/getTomorrowEvents.js";
import { getTodayEventsAfterHour } from "../helpers/getTodayEvents.js";

const sendMessage = async (event, message) => {
  try {
    const startDateTime = new Date(event.start);
    const data = {
      message,
      number: event.patient.number
    };
    const resp = await axios.post('http://localhost:3000/api/wp/message', data);
    console.log('Mensaje enviado correctamente:', resp.data);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error.message);
  }
};

export const runScheduledTask = async () => {
  try {
    const events = [];
    const { data } = await axios.get('http://localhost:3000/api/event/65e5d778670e73b1fb470c3e');
    console.log("desp de get")
    events.push(...data.events);
    // console.log(events)
    const tomorrowEvents = getTomorrowEventsBeforeHour(events, 13);
    // console.log("tomorrow" , tomorrowEvents)
    const todayEvents = getTodayEventsAfterHour(events, 13);
    // console.log("today", todayEvents)
    console.log(new Date().toISOString())

    cron.schedule('38 11 * * *', () => {
      console.log("Ejecutando");
      tomorrowEvents.forEach((event) => {
        const message = `*Recordatorio* mañana a las ${new Date(event.start).getUTCHours()}:00 horas. 🕒☺️`;
        sendMessage(event, message);
      });
    });

    cron.schedule('39 11 * * *', () => {
      console.log("Ejecutando");
      todayEvents.forEach((event) => {
        const message = `*Recordatorio* hoy a las ${new Date(event.start).getUTCHours()}:00 horas. 🕒☺️`;
        sendMessage(event, message);
      });
    });

  } catch (error) {
    console.log(error.message, "aqui");
  }
};

// import axios from "axios";
// import cron from 'node-cron'
// import { getTomorrowEventsBeforeHour } from "../helpers/getTomorrowEvents.js";
// import { getTodayEventsAfterHour } from "../helpers/getTodayEvents.js";

// export const runScheduledTask = async () => {
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