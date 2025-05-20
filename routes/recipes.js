const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const recetas = await Recipe.find().populate('autor', 'nombre');
  res.json(recetas);
});

router.get('/usuario/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const recetas = await Recipe.find({ autor: id });
    res.json(recetas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener recetas del usuario' });
  }
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { files: 3 }
});

// POST /api/recipes
router.post('/', auth, upload.array('imagenes', 3), async (req, res) => {
  try {
    const urls = req.files.map(f => `/uploads/${f.filename}`);
    const receta = new Recipe({
      ...req.body,
      imagenes: urls,
      autor: req.user.id
    });
    await receta.save();
    res.status(201).json(receta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
