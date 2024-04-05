export class EventService {
  getAllEvents(name, category, startDate, tag, pageSize, requestedPage) {
    const eventRepository = new EventRepository(); 
    //aqui inicia la segunda parte de la travesia, donde se ingresan los datos y se obtiene la respuesta
    const [events, allevents] = eventRepository.getAllEvents(name, category, startDate, tag, pageSize, requestedPage); 

    return {
      collection: query,
      pagination: {
        limit: pageSize,
        offset: requestedPage,
        nextPage: "http://localhost:7777/event?limit=15&offset=1",
        total: query2,
        name: name,
        category: category,
        startDate: startDate,
        tag: tag,
      },
    }; //faltaria modificar el return para que muestre los parametros
  }
}


