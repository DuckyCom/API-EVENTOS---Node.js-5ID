import pg from "pg";
import { config } from "./db.js"; //cambiar dbconfig por el nuevo dotenv

const client = pg.Client(DBConfig);
client.connect();

const sql = "SELECT * FROM events";
const respuesta = await client.query(sql);

//tercera parte de la travesia, aquí se ingresa la query y se obtiene la respuesta en rows
export class EventRepository{
    getAllEvents(name, category, startDate, tag, pageSize, requestedPage) {
        var sqlQuery = `SELECT * FROM events `; //si o si aca tener offest y limit, ejemplo en github/express [esta en el campus]
        //el '*' no va, esta definido el como iria en la consigna
        
        //pulir query (no tenes tantos where ya que, con 4 where's tendria 16 if's, no es lo mejor, se puede hacer de otra forma)
        const where2 = `WHERE name = ${name}`;
        const where3 = `WHERE startDate = ${startDate}`;
        


        const values = client.query(sqlQuery);

        return values.rows;
    }
}