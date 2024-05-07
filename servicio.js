const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/sumar_matrices', (req, res) => {
  const matrix1 = req.body.matrix1;
  const matrix2 = req.body.matrix2;

  if (matrix1.length === matrix2.length && matrix1[0].length === matrix2[0].length) {
    const rows = matrix1.length;
    const cols = matrix1[0].length;

    let resultMatrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      resultMatrix[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j]; // Suma los elementos de las matrices
      }
    }

    res.send(resultMatrix);
  } else {
    res.status(400).send('Las matrices deben tener la misma dimensión');
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
