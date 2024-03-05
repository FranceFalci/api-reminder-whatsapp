
export const getTomorrowEventsBeforeHour = ( events , hour) => {

  // Obtener la fecha de mañana a las 13hs
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  // tomorrowDate.setHours(hour,0,0,0)
  
  
  // Filtrar los eventos que ocurren mañana antes de las 13:00 horas
  const tomorrowEvents = events.filter(event => {
    // Obtener la fecha del evento
    const eventDate = new Date(event.start);
    // console.log(eventDate.getUTCHours())
    // Comparar el año, mes y día del evento con el año, mes y día de mañana
    // y asegurarse de que la hora del evento sea antes de las 13:00
    return eventDate.getFullYear() === tomorrowDate.getFullYear() &&
      eventDate.getMonth() === tomorrowDate.getMonth() &&
      eventDate.getDate() === tomorrowDate.getDate() &&
      eventDate.getUTCHours() < hour; // Filtrar eventos que son mañana y antes de las 13:00
  });
  
  return tomorrowEvents
  // console.log(eventosMananaAntesDe13);
}

