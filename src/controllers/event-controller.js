import express, { json, query } from "express";
import { EventService } from "../service/event-service.js";
// import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();
const eventService = new EventService();


// PUNTO 2 Y 3: LISTADO Y BUSQUEDA DE UN EVENTO
//100% CONFIRMADO QUE NAME Y STARTDATE FUCNIONAN, FALTA ARREGLAR CATEGORY Y TAG
router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    const tag = req.query.tag;
    const startDate = req.query.startDate;
    const name = req.query.name;
    const category = req.query.category;
    
    try {
        const events = await eventService.getEventsByFilters(name, category, startDate, tag, pageSize, page);
        // console.log("Eventos en evento-controller: ", events);
        return res.json(events);
    } catch (error) {
        console.log("Error al buscar");
        return res.json("Un Error");
    }
});



 
//PUNTO 4: DETALLE DE UN EVENTO
router.get("/:id", async (req, res) => {
    
    try {
        const evento = await eventService.getEventById(req.params.id);
        //Para comprobar si funciona el evento
        // console.log("evento en evento-controller: ", evento);
        return res.json(evento);
    }
    catch(error){
        console.log("No hay evento existente");
        return res.json("Ha ocurrido un error");
    }
});


// PUNTO 5: LISTADO DE PARTICIPANTES DE UN EVENTO.

router.get("/:id/enrollment", (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const userName = req.query.userName;
    const attended = req.query.attended;
    try {
        const participantesEvento = eventService.getParticipantesEvento(req.params.id, first_name, last_name, userName, attended);
        if(!participantesEvento){
            return res.status(400).json({ error: 'El formato de attended no es valido' });
        }
        return res.json(participantesEvento);
    }
    catch(error){
        console.log("Error al buscar");
        return res.json("Un Error");
    }
});


// PUNTO 8: CRUD
// Crear un evento
router.post("/", (req, res) => {
    try {
        const evento = eventService.createEvent(req.body);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al crear evento");
        return res.json("Un Error");
    }
});

//editar un evento del que soy el organizador
router.put("/:id", (req, res) => {
    try {
        const evento = eventService.editEvent(req.params.id, req.body);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al editar evento");
        return res.json("Un Error");
    }
});



// PUNTO 9: INSCRIPCION DE UN PARTICIPANTE A UN EVENTO

router.post("/:id/enrollment", (req, res) => {
    const id_user = req.body;
    const id_event = req.params.id;
    try {
        const event = eventService.postInscripcionEvento(req.params.id, req.body.id_user);
        if(!event){
            return res.status(400).json({ error: 'El formato de attended no es valido' });
        } else{
            return res.json("Se ha inscripto correctamente al evento");
        }// ACA FALTA PONER SI NO SE PUEDE INSCRIBIR Y SI SE PUDO INSCRIBIR
    }
    catch(error){
        console.log("Error al inscribir");
        return res.json("Un Error");
    }
});

/* PUNTO 10: Rating de un Evento */
router.patch("/:id/enrollment", (req, res) => {
    if(!Number.isInteger(Number(req.body.rating))&& Number.isInteger(Number(req.body.attended))){
        return res.status(400).json({ error: 'El formato de attended no es valido' });
    }
    const rating = req.body.rating;
    const descripcion = req.body.description;
    const attended = req.body.attended;
    const observation = req.body.observation;
    try {
        const enrollment = eventService.patchEnrollment(rating, descripcion, attended, observation);
        return res.json(enrollment);
    }
    catch(error){
        console.log("Error al puntuar");
        return res.json("Un Error");
    }
});

    
export default router;





