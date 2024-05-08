const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes.js'); 

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utiliza las rutas importadas
app.use('/', routes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
