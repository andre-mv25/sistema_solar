const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views/planetas')));
app.use(express.static(path.join(__dirname, 'views/img')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views/planetas', 'index.html'));
});

app.use((_req, res) => {
    res.status(404).send('Ruta no encontrada');
});

app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).send('Error interno del servidor');
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});
