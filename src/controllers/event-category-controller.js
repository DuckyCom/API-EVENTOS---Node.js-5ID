import express, { Router, json, query } from "express";
import { EventCatService } from "../service/event-category-service.js"; //ESTO TAMBIEN LO DEJAMOS ASI??
import { AuthMiddleware } from "../auth/AuthMiddleware.js";
// import { EventRepository } from "../repositories/event-respository.js";
const router = express.Router();
const eventCatService = new EventCatService(); //Esto lo dejamos asi??????

router.get("/", async (req, res) => {
    try {
        const evento = await eventCatService.getAllEventsCat();
        //Para comprobar si funciona el evento
        console.log("estoy en GET evento-category-controller");
        return res.status(200).json(evento);
    }
    catch(error){
        console.log("Error al obtener todas las categorias de eventos");
        return res.json("Ha ocurrido un error");
    }
});


router.get("/:id", async (req, res) => {
    try {
        const evento = await eventCatService.getEventsCatById(req.params.id);
        //Para comprobar si funciona el evento
        console.log("estoy en GET evento-category-controller por id");
        return res.status(200).json(evento);
    }
    catch(error){
        console.log("Error al obtener la categoria de evento por ID");
        return res.json("Ha ocurrido un error");
    }
});







export default router;