import express, { json, query } from "express";
import { EventService } from "../service/event-service.js";
// import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();
const eventService = new EventService();

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

// PUNTO 3: BUSQUEDA DE UN EVENTO
router.get("/", (req,res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    // var sqlQuery = `SELECT * FROM events LIMIT ${limit} OFFSET ${offset} WHERE id = ${req.params.id}`; ACA HAY QUE LLAMAR A LA FUNCION getEventByFilters() de event-service.js
    try{
        const event = eventService.getEventByFilters(req.query.name, req.query.category, req.query.startDate, req.query.tag, limit, offset);
        return res.json(event);
    } catch(error){
        console.log("Error al buscar");
        return res.json("Un Error");
    }
});


//PUNTO 4: DETALLE DE UN EVENTO
router.get("/:id", (req, res) => {
    try {
        const evento = eventService.getEventById(req.params.id);
        return res.json(evento);
    }
    catch(error){
        console.log("No hay evento existente");
        return res.json("Ha ocurrido un error");
    }
});

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

router.get("/:id/enrollment", (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const userName = req.query.userName;
    const attended = req.query.attended;
    try {
        const event = eventService.getParticipantesEvento(req.params.id, first_name, last_name, userName, attended);
        if(!event){
            return res.status(400).json({ error: 'El formato de attended no es valido' });
        }
        return res.json(event);
    }
    catch(error){
        console.log("Error al buscar");
        return res.json("Un Error");
    }
});


// router.get("/{id}/enrollment", (req, res) => {
//     const pageSize = req.query.pageSize;
//     const page = req.query.page;
//     const { first_name, last_name, username, attended } = req.query;


//     res.send(filteredParticipants);
// });


// router.post("/{id}/enrollment", (req,res) => {
//     const body = req.body;
//     console.log(body);


//     // aca van los eventos que se crean, se cargarian a la BD

// });
    
export default router;


