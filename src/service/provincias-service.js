import { query } from "express";
// import {ProvinciasRepository} from "../repositories/event-respository.js";
import pg from "pg";
import { config } from "../repositories/db.js"; 
const sql = "SELECT * FROM provinces";
const client = new pg.Client(config);
client.connect();

export class ProvinciasService {
    async findProvByID (id) {
        let returnEntity = null;
        console.log("Estoy en: findProvByID");
        try {
          const query = {
            text: 'SELECT * FROM provinces WHERE id = $1',
            values: [id]
          };
          const result = await client.query(query);
          returnEntity = result.rows[0]; //no hace falta el "[]"?
          console.log(result);
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
    }
    async findProvPaginated (limit, offset) {
        let returnEntity = null;
        console.log("Estoy en: findProvPaginated");
        try {
          const query = 'SELECT * FROM provinces LIMIT $1 OFFSET $2'
            const values = [limit, offset]
          
          const result = await client.query(query, values);
          //console.log(result);
          returnEntity = result.rows[0];
          console.log(result);
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
    }

}
