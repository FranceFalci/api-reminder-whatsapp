import axios from "axios";
import cron from 'node-cron'
import { getTomorrowEventsBeforeHour } from "../helpers/getTomorrowEvents.js";
import { getTodayEventsAfterHour } from "../helpers/getTodayEvents.js";

export const runScheduledTask = async () => {
  try {
    const events = [];
    const { data } = await axios.get('http://localhost:4000/api/event/');
    events.push(...data.events);

    const tomorrowEvents = getTomorrowEventsBeforeHour(events, 13);
    const todayEvents = getTodayEventsAfterHour(events, 13);


    cron.schedule('55 17 * * *', () => {
      console.log("Ejecutando");
      tomorrowEvents.forEach((event) => {
        console.log(event);
        const startDateTime = new Date(event.start);
        const message = `*Recordatorio* mañana a las ${startDateTime.getUTCHours()}:00 horas. 🕒☺️`;
        const data = {
          message,
          number: event.title
        };
        axios.post('http://localhost:3002/send-message', data)
          .then(response => {
            console.log('Mensaje enviado correctamente');
          })
          .catch(error => {
            console.error('Error al enviar el mensaje:', error);
          });
      });
    });

    cron.schedule('00 18 * * *', () => {
      console.log("Ejecutando");
      todayEvents.forEach((event) => {
        console.log(event);
        const startDateTime = new Date(event.start);
        const message = `*Recordatorio* hoy a las ${startDateTime.getUTCHours()}:00 horas. 🕒☺️`;
        const data = {
          message,
          number: event.title
        };
        axios.post('http://localhost:3002/send-message', data)
          .then(response => {
            console.log('Mensaje enviado correctamente');
          })
          .catch(error => {
            console.error('Error al enviar el mensaje:', error);
          });
      });
    });

  } catch (error) {
    console.log(error);
  }
};