import pg from "pg";
import { config } from "./db.js"; 
import res from "express/lib/response.js";
// import { generarLimitOffset } from "../utils/paginaion.js";

const client = new pg.Client(config);
client.connect();



export class EventCatRepository{
    
    async getAllEventsCat() {
        try {
            console.log("Estoy en event-category-repository");
            const query = "SELECT * FROM event_categories";
            const respuesta = await client.query(query);

            // Inicializa un array para almacenar los resultados
            const resultados = [];

            // Itera sobre los resultados y agrega cada objeto al array
            respuesta.rows.forEach(row => {
                resultados.push({
                    Nombre: row.name,
                    display_order: row.display_order,
                    id: row.id
                });
            });

            return resultados;
        } catch (error) {
            console.log(error);
            throw error; // Re-lanza el error para que sea manejado en otro lugar
        }
    }

    

   async getEventsCatById(id)
    {
        try {
            console.log("Estoy en event-category-repository");
            const query = "SELECT name FROM event_categories WHERE id = $1";
            const values = [id];
            const respuesta = await client.query(query, values);
            const resultado = respuesta.rows[0];


            return resultado;
        } catch (error) {
            console.log(error)
        }
    }

    async createEventCategory(nameCat, display_order){


        try {

            console.log("Estoy en event-category-repository");
            const query = "INSERT INTO event_categories (name, display_order) VALUES ($1, $2)";
            const values = [nameCat, display_order];
            const respuesta = await client.query(query, values);
            const resultado = respuesta.rows[0];
            console.log(resultado);
            if (resultado != null) {
                return resultado;
            } else {
                
                return res.status(404).json("BAD REQUEST: error 404");
            }

            
        } catch (error) {
            console.log(error)
        }
    }




    async updateEventCategory(id, nameCat, display_order){
                
                try {
                    console.log("Estoy en event-category-repository");
                    const query = "UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3";
                    const values = [nameCat, display_order, id];
                    const respuesta = await client.query(query, values);
                    // console.log(respuesta); 
                    const resultado = respuesta.rows[0];
                    // console.log(resultado);

                    // Verifica si se actualizó alguna fila en la base de datos
                     if (respuesta.rowCount > 0) {
                        // Si rowCount es mayor que 0, significa que la actualización fue exitosa
                        return null;
                    } else {
                        // Si no se actualizó ninguna fila, significa que el registro no se encontró
                        return 1;   
                    }

                } catch (error) {
                    console.log(error)
                }
    }



    async deleteEventCategory(id){
                
                try {
                    console.log("Estoy en event-category-repository");
                    const elementoBorrado = await this.getEventsCatById(id);
                    const query = "DELETE FROM event_categories WHERE id = $1";
                    const values = [id];
                    const respuesta = await client.query(query, values);
                    console.log(respuesta);
                    const resultado = respuesta.rows[0];
                    console.log(resultado);

                    if (resultado.rowCount > 0) {
                        return elementoBorrado;
                    } else {
                        
                        return res.status(404).json("BAD REQUEST: error 404");
                    }
                    
                } catch (error) {
                    console.log(error)
                }
    }

}
