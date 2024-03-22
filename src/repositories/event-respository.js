import pg from "pg";
import { DBConfig } from "./db.js";

const client = pg.Client(DBConfig);
client.connect();

const sql = "SELECT * FROM events";
const respuesta = await client.query(sql);


export class EventRepository{
    getAllEvents(name, category, startDate, tag) {
        var sqlQuery = `SELECT * FROM events `;
        const where2 = `WHERE name = ${name}`;
        const where3 = `WHERE startDate = ${startDate}`;
        


        const values = client.query(sqlQuery);

        return values.rows;
    }
}