// Obtener referencias a elementos del DOM
const result = document.getElementById("result");
const form = document.getElementById("form");
const train = document.getElementById("train");
const loader = document.getElementById("loader");
const trainView = document.getElementById("trainView");

let model; // Declarar una variable para almacenar el modelo entrenado

// Función asincrónica para entrenar un modelo lineal
const learnLinear = async () => {
  // Crear un modelo secuencial
  const model = tf.sequential();
  // Agregar una capa densa al modelo con una unidad y una entrada de tamaño 1
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  // Compilar el modelo con función de pérdida 'meanSquaredError' y optimizador 'sgd'
  model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
  
  // Datos de entrenamiento (x, y)
  const xs = tf.tensor2d(
    [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [15, 1]
  );
  const ys = tf.tensor2d(
    [-3, -1, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
    [15, 1]
  );

  // Configurar visualización de la historia del entrenamiento
  const surface = { name: "show.history", tab: "Training" };
  const history = [];

  // Entrenar el modelo con los datos y guardar la historia de pérdida
  await model.fit(xs, ys, {
    epochs: 500,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log("Epoch: " + epoch + " Loss: " + logs.loss);
        history.push(logs);
        tfvis.show.history(surface, history, ["loss"]);
      },
    },
  });

  return model; // Devolver el modelo entrenado
};

// Evento clic para entrenar el modelo al hacer clic en el botón "Entrenar Modelo"
train.addEventListener("click", async () => {
  loader.innerHTML = "Entrenando Modelo...(Esto puede tardar un poco)";
  model = await learnLinear(); // Llamar a la función de entrenamiento y guardar el modelo entrenado
  loader.innerHTML = "Modelo Listo, formula y = 2x + 5"; // Actualizar la interfaz
});

// Evento submit del formulario para hacer predicciones al enviar el formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  const data = new FormData(form); // Obtener datos del formulario
  const x = parseFloat(data.get("x")); // Obtener el valor de x ingresado en el formulario

  // Añadir clases de estilo a la sección de resultados
  result.classList.add("alert", "alert-primary");

  // Verificar si x es un número válido
  if (isNaN(x)) {
    result.innerHTML = "Por favor ingrese un número válido";
    return;
  }

  // Verificar si el modelo está entrenado
  if (!model) {
    result.innerHTML = "Por favor entrena el modelo antes de hacer una predicción.";
    return;
  }

  // Hacer una predicción con el modelo entrenado
  const output = model.predict(tf.tensor2d([x], [1, 1]));

  // Mostrar los resultados de la predicción y el error de predicción
  result.innerHTML = `
    <p><span class="fw-bold">Resultado de predicción: </span>${output.dataSync()[0]}</p>
    <p><span class="fw-bold">Resultado real: </span>${2 * x + 5}<p>
    <p><span class="fw-bold">Error predicción: </span>${Math.abs(2 * x + 5 - output.dataSync()[0])}</p>
  `;
});
