const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const recetas = await Recipe.find().populate('autor', 'nombre');
  res.json(recetas);
});

router.post('/', auth, async (req, res) => {
  try {
    const nueva = new Recipe({ ...req.body, autor: req.user.id });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

module.exports = router;
