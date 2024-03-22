export class EventService {
  getAllEvents(pageSize, requestedPage) {
    const eventRepository = new EventRepository();

    const [events, allevents] = eventRepository.getAllEvents(name, category, startDate, tag); // Falta agregar los parametros 

    return {
      collection: query,
      pagination: {
        limit: pageSize,
        offset: requestedPage,
        nextPage: "http://localhost:7777/event?limit=15&offset=1",
        total: query2,
      },
    };
  }
}
