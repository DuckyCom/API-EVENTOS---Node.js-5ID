import { query } from "express";
import {EventCatRepository} from "../repositories/event-category-repository.js";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import { Pagination } from "../utils/paginacion.js";
const client = new pg.Client(config);
client.connect();


export class EventCatService {


  async  getAllEventsCat(){
        //Habrá que añadir el middleware
        console.log("Estoy en event-category-service")
        try {
            const eventCatRepository = new EventCatRepository();
            const respuesta = await eventCatRepository.getAllEventsCat();
            // console.log("Estoy en:  DE event-category-service", events);
            return respuesta;
        } catch (error) {
            throw new Error('Error al obtener eventos por filtros');
        }     

    }


    getEventsCatById(id){
                //Habrá que añadir el middleware
                console.log("Estoy en GET event-category-service")
                try {
                    const eventCatRepository = new EventCatRepository();
                    const respuesta = await eventCatRepository.getEventsCatById(id);
                    // console.log("Estoy en:  DE event-category-service", events);
                    return respuesta;
                } catch (error) {
                    throw new Error('Error al obtener eventos por filtros');
                }      
    }


}