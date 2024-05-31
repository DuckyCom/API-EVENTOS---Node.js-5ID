import pg from "pg";
import { config } from "./db.js"; 
import res from "express/lib/response.js";
import { EventRepository } from "./event-respository.js";
// import { generarLimitOffset } from "../utils/paginaion.js";

const client = new pg.Client(config);
client.connect();

export class EventLocationRepository{

    async findLocationByID(id){
        let returnEntity = null;
        try {
            const query = {
                text: "SELECT * FROM event_locations WHERE id = $1",
                values: [id]
            };
            const result = await client.query(query);
            returnEntity = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }    

    async createEventLocation(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user){
        let returnEntity = null;
        try{
            const query={
                text:"INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                values:[id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user]
            }
            console.log(id_location);
            const result = await client.query(query);
            returnEntity = result.rows[0];
            console.log("Nuevo Event-Location creado:", returnEntity);
        } catch(error){
            console.log(error);
        }
        if(name === null || full_address === null || name.length() < 3 || full_address.length() < 3 || max_capacity <= 0){
            throw new Error('Bad Request')
        } 
        // FALTA PONER UN THROW NEW ERROR SI EL USUARIO NO ESTA AUTENTICADO, PERO FALTA VER COMO SABER SI ESTA O NO AUTENTICADO.
        return returnEntity;
    }







}