// Importar Express y crear un enrutador
const express = require('express');
const router = express.Router();

// Manejar la solicitud POST en la ruta '/sumar_matrices'
router.post('/sumar_matrices', (req, res) => {
  // Obtener las matrices enviadas en el cuerpo de la solicitud
  const matrix1 = req.body.matrix1;
  const matrix2 = req.body.matrix2;

  // Verificar si las matrices se enviaron correctamente
  if (!matrix1 || !matrix2) {
    return res.status(400).send('Faltan datos en las matrices');
  }

  // Verificar que las matrices tengan la misma dimensión
  if (matrix1.length === matrix2.length && matrix1[0].length === matrix2[0].length) {
    // Obtener el número de filas y columnas
    const rows = matrix1.length;
    const cols = matrix1[0].length;

    // Inicializar una matriz para almacenar el resultado de la suma
    let resultMatrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      resultMatrix[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        // Sumar los elementos correspondientes de las matrices y convertirlos a números
        resultMatrix[i][j] = Number(matrix1[i][j]) + Number(matrix2[i][j]);
      }
    }

    // Enviar la matriz resultante como respuesta en formato JSON
    res.status(200).json({ resultMatrix });
  } else {
    // Enviar un mensaje de error si las matrices no tienen la misma dimensión
    res.status(400).send('Las matrices deben tener la misma dimensión');
  }
});

// Exportar el enrutador para usarlo en otras partes de la aplicación
module.exports = router;
