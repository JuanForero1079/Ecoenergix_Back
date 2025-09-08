const express = require('express');
const router = express.Router();
const DB = require('../db/connection');

// READ: obtener todas las compras
router.get('/', (req, res) => {
  DB.query('SELECT * FROM compras', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// READ: obtener una compra por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  DB.query('SELECT * FROM compras WHERE ID_compra = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(result[0]);
  });
});

// CREATE: agregar una compra
router.post('/', (req, res) => {
  const { ID_usuario, Fecha_compra, Monto_total, Estado } = req.body;
  DB.query(
    'INSERT INTO compras (ID_usuario, Fecha_compra, Monto_total, Estado) VALUES (?, ?, ?, ?)',
    [ID_usuario, Fecha_compra, Monto_total, Estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Compra creada exitosamente!', id: result.insertId });
    }
  );
});

// UPDATE: actualizar una compra
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Fecha_compra, Monto_total, Estado } = req.body;
  DB.query(
    'UPDATE compras SET Fecha_compra = ?, Monto_total = ?, Estado = ? WHERE ID_compra = ?',
    [Fecha_compra, Monto_total, Estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Compra actualizada exitosamente!' });
    }
  );
});

// DELETE: eliminar una compra
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  DB.query('DELETE FROM compras WHERE ID_compra = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Compra eliminada exitosamente!' });
  });
});

module.exports = router;
