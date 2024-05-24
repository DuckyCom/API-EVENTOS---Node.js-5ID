import pg from "pg";
import { config } from "./db.js"; 
// import { generarLimitOffset } from "../utils/paginaion.js";

const client = new pg.Client(config);
client.connect();



export class EventCatRepository{
    async getAllEventsCat()
    {
        try {
            console.log("Estoy en event-category-repository");
            const query = "SELECT name FROM event_categories";
            const respuesta = await client.query(query);
            
            // Inicializa un array para almacenar los resultados
            const resultados = [];
            
            // Itera sobre los resultados y agrega cada nombre al array
            respuesta.rows.forEach(row => {
                resultados.push(row.name);
            });
            
            return resultados;
        } catch (error) {
            console.log(error)
        }
    }
    

    getEventsCatById(id)
    {

        try {
            console.log("")
        } catch (error) {
            console.log(error)
        }



    }


}
