import express from "express";
import UserController from "./src/controllers/user-controller,js";
import EventController from "./src/controllers/event-controller.js";
import ProvinciasController from "./src/controllers/provincias-controller.js";

const app = express(); // Inicia la API REST
app.use(express.json());
const port = 7777;
