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
// EJEMPLO USADO:
/*{
    "name": "Harry Styles",
    "description": "Un concierto muy STYLE",
    "id_event_category": 1,
    "id_event_location": 1,
    "start_date": "2022/12/03 t 00:00:00" ,
    "duration_in_minutes": 210,
    "price": 17500,
    "enabled_for_enrollment": true,
    "max_assistance": 90000,
    "id_creator_user": 1
}
*/
router.post("/", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const id_event_category = req.body.id_event_category;
    const id_event_location = req.body.id_event_location;
    const start_date = req.body.start_date;
    const duration_in_minutes = req.body.duration_in_minutes;
    const price = req.body.price;
    const enabled_for_enrollment = req.body.enabled_for_enrollment;
    const max_assistance = req.body.max_assistance;
    const id_creator_user = req.body.id_creator_user;

    try {
        const evento = eventService.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al crear evento");
        return res.json("Un Error");
    }
});

//EJEMPLO USADO:


router.put("/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const category = req.body.category;
    const capacity = req.body.capacity;
    const location = req.body.location;
    const image = req.body.image;
    const tag = req.body.tag;
    const price = req.body.price;
    const user_id = req.body.user_id;
    try {
        const evento = eventService.updateEvent(id, name, description, start_date, end_date, category, capacity, location, image, tag, price, user_id);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al editar evento");
        return res.json("Un Error");
    }
});

//editar un evento del que soy el organizador
router.put("/:id", (req, res) => {
    try {
        const evento = eventService.editEvent(id, name, description, start_date, end_date, category, capacity, location, image, tag, price, user_id);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al editar evento");
        return res.json("Un Error");
    }
});


//eliminar un evento del que soy el organizador
router.delete("/:id", (req, res) => {
    try {
        const evento = eventService.deleteEvent(id);
        return res.json(evento);
    }
    catch(error){
        console.log("Error al eliminar evento");
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
        }
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





