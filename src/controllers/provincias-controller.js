import express, {Request, Response} from "express";
const express = require('express');
const router = express.Router();


// Importar el modelo de Provincia
  
// Obtener una provincia por ID
router.get('/Provincias/:id', async (req, res) => {
  try {
    const provincia = await Provincia.findById(req.params.id);
    res.json(provincia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener todas las provincias con paginación
router.get('/Provincias', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const provincias = await Provincia.find().skip(skip).limit(limit);
    res.json(provincias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
