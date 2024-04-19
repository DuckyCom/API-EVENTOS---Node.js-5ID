import {ProvinciasService} from "../service/provincias-service.js";
import express from "express";
const router = express.Router();

const provinciaService = new ProvinciasService();

// Obtener una provincia por ID
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const provincia = await provinciaService.findProvByID(req.params.id);
    res.json(provincia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener todas las provincias con paginación
router.get('/', async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  try {
    const provincias = await provinciaService.findProvPaginated(limit, offset);
    console.log(provincias);
    res.json(provincias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva provincia
/* REVISAR PORQUE CUANDO PONEMOS ESTE BODY NO NOS INSERTA, APARECE EL NAME, FULL NAME, LATITUDE Y LONGITUDE COMO UNDEFINED COMO UNDEFINED: 
{
  name:"PalmaM"
  full_name: "Palma de Mallorca"
  latitude: 39.571625
  longitude: 2.650544
}
*/
router.post('/', async (req, res) => {
  const name = req.body.name;
  const full_name = req.body.full_name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  console.log(name, full_name, latitude, longitude)

  try {
    const provincia = await provinciaService.insertProvinceNew(name,full_name, latitude, longitude);
    res.status(201).json(provincia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una provincia por ID
router.put('/:id', async (req, res) => {
  try {
    const provincia = await provinciaService.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(provincia[1][0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una provincia por ID
router.delete('/:id', async (req, res) => {
  try {
    await provinciaService.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: 'Provincia eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;