import express, { query } from "express";
import { EventService } from "../service/event-service";

const router = express.Router();

//Busqueda de un Evento


//aca inicia toda la travesia, donde se ingresan que datos se necesitan y esta parte los procesa
router.get("/event", (req, res) => {
    const { name, category, startDate, tag } = req.query;
    const eventService = new EventService();

   const eventos = eventService.getAllEvents(name, category, startDate, tag);


    res.json(eventos);
});

// Listado participantes
router.get("/event/{id}", (req,res) => {
    const pageSize =req.query.pageSize;
    const page = req.query.page;


    // aca van los eventos, que se cargarian por BD

});

router.get("/event/{id}/enrollment", (req, res) => {
    const pageSize = req.query.pageSize;
    const page = req.query.page;

  
})


router.post("/event/{id}/enrollment", (req,res) => {
    const body = req.body;
    console.log(body);


    // aca van los eventos que se crean, se cargarian a la BD

});




