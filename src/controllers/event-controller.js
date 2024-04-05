import express, { json, query } from "express";
import { EventService } from "../service/event-service.js";
// import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();
const eventService = new EventService();

//Busqueda de un Evento


//PUNTO 2: LISTADO 
router.get("/", (req, res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    const tag = req.query.tag;
    const startDate = req.query.startDate;
    const name = req.query.name;
    const category = req.query.category;
    
    try{
        const allEvents = eventService.getAllEvents(page, pageSize, tag, startDate, name, category, req.url);
        return res.json(allEvents);
    }catch(error){ 
        console.log("Error al buscar");
        return res.json("Un Error");
    }    
});

//PUNTO 3: BUSQUEDA DE EVENTO




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
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    // const pageSize = 10;
    // const page = 2;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const eventId = req.params.id;

    // Consulta SQL para obtener el detalle del evento y su localización completa
    const sqlQuery = ` SELECT e.*, l.*, p.* 
    FROM events e 
    JOIN event_locations el ON el.id = e.id_event_location
    JOIN locations l ON el.id_location = l.id 
    JOIN provinces p ON l.id_province = p.id  
    LIMIT 1 OFFSET 1`;
    
    res.json(sqlQuery);
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


