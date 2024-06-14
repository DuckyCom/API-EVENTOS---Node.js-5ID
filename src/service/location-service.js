import { query } from "express";
import {LocationRepository} from "../repositories/location-repository.js";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import { Pagination } from "../utils/paginacion.js";
const client = new pg.Client(config);
client.connect();

export class LocationService{
    async getAllLocations(url){
        let returnEntity = null;
        console.log("Estoy en: getAllLocations");
        try {
            const query = {
                text: 'SELECT * FROM locations',
            };
            const result = await client.query(query);
            console.log(result);
            returnEntity = result.rows;
            const limit = Pagination.ParseLimit(15);
            const offset = Pagination.ParseOffset(0);
            returnEntity = Pagination.BuildPagination(returnEntity, limit, offset, url, returnEntity.length);
        } catch (error) {
            console.log(error);
        }

        return returnEntity;
    }

    async getLocationById(id){
        let returnEntity = null;
        console.log("Estoy en: getLocationById");
        try {
            const query = {
                text: 'SELECT * FROM locations WHERE id = $1',
                values: [id]
            };
            const result = await client.query(query);
            returnEntity = result.rows[0];
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        if(!returnEntity){
            throw new Error("not found");
        }
        return returnEntity;
    }

    async getEventsLocationByLocations(id){
        
    }

    async findLocationsByProvince(id) {
        let locations = null;
      
        try {
          const selectQuery = {
            text: 'SELECT * FROM locations WHERE id_province = $1',
            values: [id]
          };
          const selectResult = await client.query(selectQuery);
          locations = selectResult.rows;
        } catch (error) {
          console.error('Error al buscar localidades:', error);
          throw error;
        }
      
        return locations; // Devuelve las localidades encontradas o null si no se encontraron
      }
      
      async deleteLocationsByProvinceId(id) {
        let deletedLocationNames = null;
      
        try {
          const deleteQuery = {
            text: 'DELETE FROM locations WHERE id_province = $1 RETURNING name',
            values: [id]
          };
          const result = await client.query(deleteQuery);
          deletedLocationNames = result.rows.map(row => row.name);
        } catch (error) {
          console.error('Error al eliminar localidades:', error);
          throw error;
        }
      
        return deletedLocationNames; // Devuelve los nombres de las localidades eliminadas o null si no se encontraron
      }
}