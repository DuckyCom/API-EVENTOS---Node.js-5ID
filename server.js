import express from "express";
import UserController from "./src/controllers/user-controller.js";
import EventController from "./src/controllers/event-controller.js";
import ProviciasController from "./src/controllers/provincias-controller.js"
// import ProvinciasController from "./src/controllers/provincias-controller.js";

const app = express(); // Inicia la API REST
app.use(express.json());
const port = 7777;
app.use("/api/event", EventController);
app.use("/api/provincias", ProviciasController);
app.use("/api/user", UserController);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
