export class EventService {
  getAllEvents(name, category, startDate, tag, pageSize, requestedPage) {
    const eventRepository = new EventRepository(); 

    const [events, allevents] = eventRepository.getAllEvents(name, category, startDate, tag, pageSize, requestedPage); //aqui inicia la tercera parte de la travesia, donde se ingresan los datos y se obtiene la respuesta

    return {
      collection: query,
      pagination: {
        limit: pageSize,
        offset: requestedPage,
        nextPage: "http://localhost:7777/event?limit=15&offset=1",
        total: query2,
      },
    }; //faltaria modificar el return para que muestre los parametros
  }
}
