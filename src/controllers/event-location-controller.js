import express, { Router, json, query } from "express";
import { EventLocationService } from "../service/event-location-service.js";
import { AuthMiddleware } from "../auth/AuthMiddleware.js";
const router = express.Router();
const eventLocationService = new EventLocationService();

router.get("/:id", AuthMiddleware, async (req, res) => {
    try {
        const location = await eventLocationService.findLocationByID(req.params.id);
        console.log("estoy en GET event-location-controller por id");
        console.log(location);
        if (location != null) {
            return res.status(200).json(location);
        } else {
            return res.status(404).json("No se ha encontrado la localización con el id proporcionado");
        }
    }
    catch(error){
        console.log("Error al obtener la localización por ID");
        return res.json("Ha ocurrido un error");
    }
});

router.post("/", AuthMiddleware, async (req, res) => {
    const id_location = req.body.id_location;
    const name = req.body.name;
    const full_address = req.body.full_address;
    const max_capacity = req.body.max_capacity;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const id_creator_user = req.user.id;
    try {
        const location = await eventLocationService.createEventLocation(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user);
        console.log("estoy en POST event-location-controller");
        return res.status(200).json("Localización creada con éxito");
    }
    catch(error){
        console.log("Error al crear la localización");
        if(error.message === 'Bad Request'){
            return res.status(400).json({message:error})
        } else{
            return res.status(401).json({message:error})
        }
        // falta throw error de usuario no autenticado :p
    }
});

router.put("/", AuthMiddleware, async (req,res) => {
    const id_location = req.body.id_Location;
    const name = req.body.name;
    const full_address = req.body.full_address;
    const max_capacity = req.body.max_capacity;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    try{
        const location = await eventLocationService.putEventLocation(id_location, name, full_address, max_capacity, latitude, longitude)
        return res.status(200).json("Localización actualizada con éxito");
    } catch(error){

    }
});


export default router;