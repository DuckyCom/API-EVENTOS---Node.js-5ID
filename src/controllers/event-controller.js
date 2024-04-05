import express, { json, query } from "express";
import { EventService } from "../service/event-service.js";
import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();

//Busqueda de un Evento


//aca inicia toda la travesia, donde se ingresan que datos se necesitan y esta parte los procesa
router.get("/", (req, res) => {
    const { name, category, startDate, tag } = req.query;
    const eventService = new EventService();
    const pageSize = 1;
    const requestedPage = 1;
    const eventos = eventService.getAllEvents(name, category, startDate, tag, pageSize, requestedPage);


    res.json(eventos);
});



// Busqueda de un evento
router.get("/event}", (req,res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    var sqlQuery = `SELECT * FROM events LIMIT ${limit} OFFSET ${offset} WHERE id = ${req.params.id}`;
});


// Listado participantes
// router.get("/event/{id}", (req,res) => {
//     const pageSize = req.query.pageSize;
//     const page = req.query.page;
//     const offset = (page - 1) * pageSize;
//     const limit = pageSize;
//     var sqlQuery = `SELECT * FROM events LIMIT ${limit} OFFSET ${offset} WHERE id = ${req.params.id}`;
    



// });
router.get("/:id", (req, res) => {
    // const pageSize = req.query.pageSize;
    // const page = req.query.page;
    const pageSize = 10;
    const page = 2;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const eventId = req.params.id;

    // Consulta SQL para obtener el detalle del evento y su localización completa
    const sqlQuery = ` SELECT events.*, locality_table.*, province_table.* 
    FROM events AS events 
    JOIN event_locations AS event_locations_table ON event_locations_table.id = events.id_event_location
    JOIN locations AS locality_table ON event_locations_table.id_location = locality_table.id 
    JOIN provinces AS province_table ON locality_table.id_province = province_table.id  
    LIMIT 1 OFFSET 1`;
    
    res.json();
    //falta agregar el que te haga la query
});


// PUNTO 5: LISTADO DE PARTICIPANTES DE UN EVENTO.
router.get("/{id}/enrollment", (req, res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    const { first_name, last_name, username, attended } = req.query;


    res.send(filteredParticipants);
});


router.post("/{id}/enrollment", (req,res) => {
    const body = req.body;
    console.log(body);


    // aca van los eventos que se crean, se cargarian a la BD

});
    
export default router;


