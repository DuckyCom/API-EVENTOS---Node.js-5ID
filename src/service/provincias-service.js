import { query } from "express";
// import {ProvinciasRepository} from "../repositories/event-respository.js";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import { Pagination } from "../utils/paginacion.js";
const sql = "SELECT * FROM provinces";
const pagination = new Pagination();
const client = new pg.Client(config);
client.connect();
export class ProvinciasService {
    // constructor(){
    //     this.client = new pg.Client(config);
    //     this.client.connect();
    // }

    async findProvByID (id) {
        let returnEntity = null;
        console.log("Estoy en: findProvByID");
        try {
          const query = {
            text: 'SELECT * FROM provinces WHERE id = $1',
            values: [id]
          };
          const result = await client.query(query);
          returnEntity = result.rows[0];
          // console.log(returnEntity == null)
          // console.log(result);
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
    }


    
    async findProvPaginated (limit, offset) {
        let returnEntity = null;
        try {
          const query = {
            text: 'SELECT * FROM provinces LIMIT $1 OFFSET $2',
            values: [limit, offset]
          };
          const result = await client.query(query);
          //console.log(result);
          returnEntity = result.rows; //este rows NO tiene que ir con 0, ya que debe tomar todos los valores
          console.log(result);
        } catch (error) {
          console.log(error);
        }
        return returnEntity;
    }

    async getAllProvinces () {
   let returnEntity = null;
      console.log("Estoy en: findProvPaginated");
      try {
        const query = {
          text: 'SELECT * FROM provinces',
        };
        const result = await client.query(query);
        //console.log(result);
        const rows = result.rows;
        returnEntity = rows.length
        // console.log(returnEntity);
      } catch (error) {
        console.log(error);
      }
      return returnEntity;
  }

    async insertProvinceNew(name, full_name, latitude, longitude){
        let insertedProvince = null;
        console.log(name, full_name, latitude, longitude)
        const query = {
            text: 'INSERT INTO provinces (name, full_name, latitude, longitude) VALUES ($1, $2, $3, $4)',
            values: [name, full_name, latitude, longitude],
        };
    
        try {
            const result = await client.query(query);
            insertedProvince = result.rows[0];
            console.log('Nueva provincia insertada:', insertedProvince);
        } catch (error) {
            console.error('Error al insertar nueva provincia:', error);
        }
        return insertedProvince;
    }

async deleteProvince(id){
  let deletedProvince = null;
  const query = {
      text: 'DELETE FROM provinces WHERE id = $1 RETURNING *',
      values: [id],
  };

  try {
      const result = await client.query(query);
      deletedProvince = result.rows[0];
      //NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE -- NOTA IMPORTANTE --
      //Querido yo del futuro, te informo que no deja borrar una provincia si tiene una localidad asociada, por lo que habria que borrar su localidad primero, muchas gracias.
      console.log('Provincia eliminada:', deletedProvince);
  } catch (error) {
      console.error('Error al eliminar provincia:', error);
      throw error; // Relanza el error para manejarlo en el controlador
  }

  return deletedProvince; // Devuelve la provincia eliminada o null si no se encontró
}


  

    async updateProvince(id, name, full_name, latitude, longitude){
        let updatedProvince = null;
        const query = {
            text: 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4 WHERE id = $5',
            values: [name, full_name, latitude, longitude, id],
        };
    
        try {
            const result = await client.query(query);
            updatedProvince = result.rows[0];
            console.log('Provincia actualizada:', updatedProvince);
        } catch (error) {
            console.error('Error al actualizar provincia:', error);
        }
        if(!updatedProvince){
            throw new Error('Not Found');
        }
        return updatedProvince;
    }

    async findLocationsByProvincePaginated(id, limit, offset){
        let returnEntity = null;
        console.log("Estoy en: findLocationsByProvincePaginated");
        try {
          const query = {
            text: 'SELECT * FROM locations WHERE id_province = $1 LIMIT $2 OFFSET $3',
            values: [id, limit, offset]
          };
          const result = await client.query(query);

          returnEntity = result.rows;

        } catch (error) {
          console.log(error);
        }
        return returnEntity;

    }

    async getAllLocations(id){

      let returnEntity = null;
      console.log("Estoy en: findLocationsByProvince");
      try {
        const query = {
          text: 'SELECT * FROM locations WHERE id_province = $1',
          values: [id]
        };
        const result = await client.query(query);
        console.log("Result", result);
    
        returnEntity = result.rows;
        returnEntity = returnEntity.length; 

    
        return returnEntity;
      } catch (error) {
        console.log(error);
      }
      return returnEntity;

  }

}


