
export const getTodayEventsAfterHour = (events, hour) => {

  // Obtener la fecha de mañana a las 13hs
  const todayDate = new Date(new Date());
  // tomorrowDate.setHours(hour,0,0,0)

  // console.log(todayDate)
  // // Filtrar los eventos que ocurren mañana antes de las 13:00 horas
  const todayEvents = events.filter(event => {
    // Obtener la fecha del evento
    const eventDate = new Date(event.start);
    // Comparar el año, mes y día del evento con el año, mes y día de mañana
    // y asegurarse de que la hora del evento sea antes de las 13:00
    return eventDate.getFullYear() === todayDate.getFullYear() &&
      eventDate.getMonth() === todayDate.getMonth() &&
      eventDate.getDate() === todayDate.getDate() &&
      eventDate.getUTCHours() > hour; // Filtrar eventos que son mañana y antes de las 13:00
  });

  return todayEvents
}

