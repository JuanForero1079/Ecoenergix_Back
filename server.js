const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rutas
const comprasRoutes = require('./routes/compras');
const entregaRoutes = require('./routes/entrega');

app.use('/api/compras', comprasRoutes);
app.use('/api/entrega', entregaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
