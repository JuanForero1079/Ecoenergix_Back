const express = require('express');
const router = express.Router();
const DB = require('../db/connection');

// READ: obtener todas las entregas
router.get('/', (req, res) => {
  DB.query('SELECT * FROM entrega', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// READ: obtener una entrega por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  DB.query('SELECT * FROM entrega WHERE ID_entrega = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Entrega no encontrada' });
    res.json(result[0]);
  });
});


// CREATE: agregar una entrega
router.post('/', (req, res) => {
  const { Fecha_entrega, ID_usuario, ID_producto, Cantidad } = req.body;
  DB.query(
    'INSERT INTO entrega (Fecha_entrega, ID_usuario, ID_producto, Cantidad) VALUES (?, ?, ?, ?)',
    [Fecha_entrega, ID_usuario, ID_producto, Cantidad],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Entrega agregada exitosamente!', id: result.insertId });
    }
  );
});

// UPDATE: actualizar una entrega
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Fecha_entrega, Cantidad } = req.body;
  DB.query(
    'UPDATE entrega SET Fecha_entrega = ?, Cantidad = ? WHERE ID_entrega = ?',
    [Fecha_entrega, Cantidad, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Entrega actualizada exitosamente!' });
    }
  );
});

// DELETE: eliminar una entrega
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  DB.query('DELETE FROM entrega WHERE ID_entrega = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Entrega eliminada exitosamente!' });
  });
});

module.exports = router;
