import pg from "pg";
import { config } from "./db.js";

const client = new pg.Client(config);
client.connect();

export class EventCatRepository {
  async getAllEventsCat(pageSize, requestedPage) {
    console.log("Estoy en event-category-repository");
    try {
      const query1 = "SELECT * FROM event_categories LIMIT $1 OFFSET $2";
      const values1 = [pageSize, requestedPage];
      const respuesta1 = await client.query(query1, values1);

      const query2 = "SELECT count(*) FROM event_categories";
      const respuesta2 = await client.query(query2);

      return {
        collection: respuesta1.rows,
        pagination: {
          limit: pageSize,
          offset: requestedPage,
          nextPage: requestedPage + pageSize < parseInt(respuesta2.rows[0].count, 10)
            ? `http://localhost:3000/pizzas?limit=${pageSize}&offset=${requestedPage + pageSize}`
            : null,
          total: parseInt(respuesta2.rows[0].count, 10),
        },
      };
    } catch (error) {
      console.error("Error en event-category-repository", error);
      throw error; 
    }
  }

  async getEventsCatById(id) {
    try {
      console.log("Estoy en event-category-repository");
      const query = "SELECT name FROM event_categories WHERE id = $1";
      const values = [id];
      const respuesta = await client.query(query, values);
      return respuesta.rows[0];
    } catch (error) {
      console.error("Error en getEventsCatById", error);
      throw error;
    }
  }

  async createEventCategory(nameCat, display_order) {
    try {
      console.log("Estoy en event-category-repository");
      const query = "INSERT INTO event_categories (name, display_order) VALUES ($1, $2) RETURNING *";
      const values = [nameCat, display_order];
      const respuesta = await client.query(query, values);
      return respuesta.rows[0];
    } catch (error) {
      console.error("Error en createEventCategory", error);
      throw error;
    }
  }

  async updateEventCategory(id, nameCat, display_order) {
    try {
      console.log("Estoy en event-category-repository");
      const query = "UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3 RETURNING *";
      const values = [nameCat, display_order, id];
      const respuesta = await client.query(query, values);
      if (respuesta.rowCount > 0) {
        return respuesta.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en updateEventCategory", error);
      throw error;
    }
  }

  async deleteEventCategory(id) {
    try {
      console.log("Estoy en event-category-repository");
      const elementoBorrado = await this.getEventsCatById(id);
      const query = "DELETE FROM event_categories WHERE id = $1 RETURNING *";
      const values = [id];
      const respuesta = await client.query(query, values);
      if (respuesta.rowCount > 0) {
        return elementoBorrado;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en deleteEventCategory", error);
      throw error;
    }
  }
}
