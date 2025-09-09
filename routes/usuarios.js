const express = require('express');
const router = express.Router();
const DB = require('../db/connection');

// GET all usuarios
router.get('/', (req, res) => {
  DB.query('SELECT * FROM usuarios', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los usuarios', details: err });
    res.json(result);
  });
});

// GET usuario by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  DB.query('SELECT * FROM usuarios WHERE ID_usuario = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el usuario', details: err });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
});

// CREATE usuario
router.post('/', (req, res) => {
  const { Nombre, Correo_electronico, Contraseña, Rol_usuario, Tipo_documento, Numero_documento, Foto_usuario, Estado_usuario } = req.body;

  // Validación de campos obligatorios
  if (!Nombre || !Correo_electronico || !Contraseña || !Rol_usuario || !Tipo_documento || !Numero_documento) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  DB.query(
    'INSERT INTO usuarios (Nombre, Correo_electronico, Contraseña, Rol_usuario, Tipo_documento, Numero_documento, Foto_usuario, Estado_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [Nombre, Correo_electronico, Contraseña, Rol_usuario, Tipo_documento, Numero_documento, Foto_usuario || null, Estado_usuario || 'Activo'],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear el usuario', details: err });

      const nuevoUsuario = {
        ID_usuario: result.insertId,
        Nombre,
        Correo_electronico,
        Rol_usuario,
        Tipo_documento,
        Numero_documento,
        Foto_usuario: Foto_usuario || null,
        Estado_usuario: Estado_usuario || 'Activo'
      };

      res.status(201).json({ message: 'Usuario creado exitosamente!', usuario: nuevoUsuario });
    }
  );
});

// UPDATE usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Correo_electronico, Contraseña, Rol_usuario, Tipo_documento, Numero_documento, Foto_usuario, Estado_usuario } = req.body;

  if (!Nombre || !Correo_electronico || !Contraseña || !Rol_usuario || !Tipo_documento || !Numero_documento) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
  }

  DB.query(
    'UPDATE usuarios SET Nombre = ?, Correo_electronico = ?, Contraseña = ?, Rol_usuario = ?, Tipo_documento = ?, Numero_documento = ?, Foto_usuario = ?, Estado_usuario = ? WHERE ID_usuario = ?',
    [Nombre, Correo_electronico, Contraseña, Rol_usuario, Tipo_documento, Numero_documento, Foto_usuario || null, Estado_usuario || 'Activo', id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar el usuario', details: err });

      const usuarioActualizado = {
        ID_usuario: id,
        Nombre,
        Correo_electronico,
        Rol_usuario,
        Tipo_documento,
        Numero_documento,
        Foto_usuario: Foto_usuario || null,
        Estado_usuario: Estado_usuario || 'Activo'
      };

      res.json({ message: 'Usuario actualizado exitosamente!', usuario: usuarioActualizado });
    }
  );
});

// DELETE usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  DB.query('DELETE FROM usuarios WHERE ID_usuario = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el usuario', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
    }

    res.json({ message: 'Usuario eliminado exitosamente!', id });
  });
});

module.exports = router;
