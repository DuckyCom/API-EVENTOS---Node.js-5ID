import express, { Router, json, query } from "express";
import { EventService } from "../service/event-service.js";
import { AuthMiddleware } from "../auth/AuthMiddleware.js";
import { Pagination } from "../utils/paginacion.js";

// import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();
const eventService = new EventService();
const pagination = new Pagination();

// PUNTO 2 Y 3: LISTADO Y BUSQUEDA DE UN EVENTO
// VERIFICAR SI ES QUE FALTA ARREGLAR CATEGORY Y TAG
router.get("/", async (req, res) => {
    const limit = pagination.parseLimit(req.query.limit);
    const offset = pagination.parseOffset(req.query.offset);
    const basePath = "api/event"
    const tag = req.query.tag;
    const startDate = req.query.startDate;
    let name = req.query.name;
    const category = req.query.category;

    if (name) {
        name = name.trim();
    }

    try {
        // console.log("Estoy antes del getEventsByFilters");
        const events = await eventService.getEventsByFilters(name, category, startDate, tag, limit, offset);
        const total = await eventService.getAllEventsUnconfirmedName(name, category, startDate, tag);  // Aquí `total` contiene todos los eventos que matchean con los filtros, sin importar el límite y el offset.
        // console.log("Estoy despues del getEventsByFilters");
        const paginatedResponse = pagination.buildPaginationDto(limit, offset, total, req.path, basePath);
        // console.log("Estoy despues del buildPaginationDto");
        return res.status(200).json({
            eventos: events,
            paginacion: paginatedResponse
        });
    } catch (error) {
        console.log("Error al buscar eventos:", error);
        return res.status(500).json({ error: "Un Error ha ocurrido" });
    }
});
 
//PUNTO 4: DETALLE DE UN EVENTO
router.get("/:id", async (req, res) => {
    
    try {
        const evento = await eventService.getEventById(req.params.id);
        if (!evento) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        else{
            return res.status(200).json({ Evento: evento });
        }
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

router.get("/:id/enrollment", async (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const userName = req.query.userName;
    const attended = req.query.attended;
    const rating = req.query.rating;
    console.log("controller")
    try {
        const participantesEvento = await eventService.getParticipantesEvento(req.params.id, first_name, last_name, userName, attended, rating);
        
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
}
*/
router.post("/", AuthMiddleware ,async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const id_event_category = req.body.id_event_category;
    const id_event_location = req.body.id_event_location;
    const start_date = req.body.start_date;
    const duration_in_minutes = req.body.duration_in_minutes;
    const price = req.body.price;
    const enabled_for_enrollment = req.body.enabled_for_enrollment;
    const max_assistance = req.body.max_assistance;
    const id_creator_user = req.user.id;

    try {
        const evento = await eventService.createEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return res.status(200).json(evento);
    }
    catch(error){
        console.log("Error al crear evento");
        if(error.message === 'Not Found'){
            return res.status(404).json({ message: error });
        }
        if(error.message === 'Bad Request'){
            return res.status(400).json("Bad Request");
        }
    }
});

//EJEMPLO USADO:
/*
{
    "name": "Coldplay",
    "description": "Un show de Coldplay",
    "id_event_category": 1,
    "id_event_location": 1,
    "start_date": "2022/11/01 t 20:00:00" ,
    "duration_in_minutes": 180,
    "price": 18000,
    "enabled_for_enrollment": true,
    "max_assistance": 90000,
}

{
    "name": "Harry Styles",
    "description": "Un concierto muy STYLE",
    "id_event_category": 1,
    "id_event_location": 1,
    "start_date": "2022/12/03 t 00:00:00" ,
    "duration_in_minutes": 210,
    "price": 17500,
    "enabled_for_enrollment": true,
    "max_assistance": 90000
}
*/
router.put("/:id", AuthMiddleware , async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const start_date = req.body.start_date; // DE ACA LO UNICO QUE NO NOS ANDA ES EL TEMA DEL STARTDATE A LA HORA DE POSTMAN. YA QUE MANDA QUE NO DEJA TIPO INTEGER.
    const duration_in_minutes = req.body.duration_in_minutes;
    const id_event_category = req.body.id_event_category;
    const id_event_location = req.body.id_event_location;
    const price = req.body.price;
    const max_assistance = req.body.max_assistance;
    const enabled_for_enrollment = req.body.enabled_for_enrollment;
    const id_creator_user = req.user.id;
// const elEvento = req.body; POLSHU RECOMIENDA HACER UNA CLASE DE EVENTO QUE CONTENGA TODO LO DE ARRIBA, YO TAMBIEN LO PIENSO, PERO NO HAY TIEMPO AHORA PARA HACERLO. LO HACEMOS EN LA SEGUNDA ENTREGA :)

    try {
        console.log(start_date)
        const evento = await eventService.updateEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        if(evento){
            return res.status(200).json({ Message: 'Actualizado correctamente' });
        }
        
    }
    catch(error){
        console.log("Error al editar evento");
        return res.json("Un Error");
    }
});

//eliminar un evento del que soy el organizador
//EJEMPLO USADO:
/*



*/
router.delete("/:id", AuthMiddleware , async (req, res) => {
    const id = req.params.id;
    try {
        const rowsAffected = await eventService.deleteEvent(id);
        if (rowsAffected > 0){
            return res.status(200).json({'mensaje':'Se elimino el evento'});
        }else{
            return res.status(400).json({'mensaje':'no se elimino'});
        }        
    }
    catch(error){
        console.log("Error al eliminar evento");
        return res.json("Un Error");
    }
});



// PUNTO 9: INSCRIPCION DE UN PARTICIPANTE A UN EVENTO

router.post("/:id/enrollment", AuthMiddleware, async (req, res) => {
    const id_user = req.user.id;
    const id_event = req.params.id;

    try {
        // Verificar si el evento existe
        const event = await eventService.getEventById(id_event);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        // Verificar si el evento está habilitado para inscripción
        if (!event.enabled_for_enrollment) {
            return res.status(400).json({ error: 'El evento no está habilitado para inscripción' });
        }

        // Verificar si el evento ha alcanzado la capacidad máxima
        if (event.current_attendance >= event.max_assistance) {
            return res.status(400).json({ error: 'El evento ha alcanzado la capacidad máxima' });
        }

        // // Verificar si el evento ya ocurrió o es hoy
        // const today = new Date();
        // if (event.start_date <= today) {
        //     return res.status(400).json({ error: 'El evento ya ha ocurrido o es hoy' });
        // }

        // Verificar si el usuario ya está inscrito en el evento
        const isEnrolled = await eventService.isUserEnrolled(id_user, id_event);
        if (isEnrolled) {
            return res.status(400).json({ error: 'El usuario ya está inscrito en el evento' });
        }

        // Si todas las verificaciones pasan, proceder con la inscripción
        await eventService.postInscripcionEvento(id_user, id_event);
        return res.status(201).json({ message: 'Usuario inscrito exitosamente' });

    } catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'Evento no encontrado' });
        } else {
            return res.status(400).json({ error: 'Solicitud incorrecta', message: error.message });
        }
    }
});


// SOLUCIONAR MAS TARDE ESTE DELETE.

router.delete("/:id/enrollment", AuthMiddleware ,async (req, res) => {
    const id_user = req.user.id;
    const id_event = req.params.id;
    try{
        const event = await eventService.deleteInscripcionEvento(id_event, id_user);
        if(!event){
            return res.status(404).json({ error: 'El id de evento en event enrollment no existe' });
        } else{
            return res.json("Se ha desinscripto correctamente al evento");
        }
    } catch(error){
        return res.status(400).json({error: "El usuario no se encuentra registrado o se esta intentando borrar algo que es hoy o ya sucedió"})
        console.log("Error al desinscribir");
    }
});

/* PUNTO 10: Rating de un Evento */
// router.patch("/:id/enrollment", AuthMiddleware, async (req, res) => {
//     if(!Number.isInteger(Number(req.body.rating))&& Number.isInteger(Number(req.body.attended))){
//         return res.status(400).json({ error: 'El formato de attended no es valido' });
//     }
//     const rating = req.body.rating;
//     const descripcion = req.body.description;
//     const attended = req.body.attended;
//     const observation = req.body.observation;
//     try {
//         const enrollment = await eventService.patchEnrollment(rating, descripcion, attended, observation);
//         return res.json(enrollment);
//     }
//     catch(error){
//         console.log("Error al puntuar");
//         return res.json("Un Error");
//     }
// });


// IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE --- IMPORTANTE
// esto de aca abajo es de CHATGPT ya que lo de arriba era lo nuestro y no andaba una cosita, por lo tanto FIJARSE PORQUE CUANDO PONEMOS: http://localhost:7777/api/event/3/enrollment/5 MANDA: 
//{
//    "error": "El rating debe ser un entero entre 1 y 10"
//}
router.patch("/:id/enrollment/:enrollment_id", AuthMiddleware, async (req, res) => {
    // Obtener los parámetros y el cuerpo del request
    const id = req.params.id;
    const enrollment_id = req.params.enrollment_id;
    const rating = req.params.rating;
    const observations = req.body.observations;
    const userId = req.user.id;  // Suponiendo que el ID del usuario autenticado se guarda en req.user.id

    // Validar que el rating es un entero entre 1 y 10
    if (rating < 1 || rating > 10) {
        return res.status(400).json({ error: 'El rating debe ser un entero entre 1 y 10' });
    }
    try {
        // Verificar si el usuario está registrado en el evento y si el evento ya ha finalizado
        const eventEnrollment = await eventService.getEventEnrollment(id, userId);
        if (eventEnrollment) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }

        // const { start_date } = eventEnrollment;
        // const hoy = new Date();
        // if (new Date(start_date) > hoy) {
        //     return res.status(400).json({ error: 'El evento aún no ha finalizado' });
        // }

        // Actualizar la inscripción
        const updatedEnrollment = await eventService.updateEventEnrollment(enrollment_id, rating, observations);
        console.log(updatedEnrollment)
        return res.status(200).json(updatedEnrollment);
    } catch (error) {
        // Manejar errores y retornar una respuesta adecuada
        if (error.message === 'Usuario no autenticado') {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        console.error('Error al actualizar la inscripción:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});



    
export default router;





