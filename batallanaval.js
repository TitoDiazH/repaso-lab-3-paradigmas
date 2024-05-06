const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = (pregunta) => {
    return new Promise((resolve) => {
      rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
  };
  

function crearTablero(a, b) {
  const filas = {};
  for (let j = 0; j < b; j++) {
    filas[j] = Array(a).fill(".");
  }
  return filas;
}

function mostrarTablero(tablero) {
  for (const fila of Object.values(tablero)) {
    console.log(fila.join(""));
  }
  console.log("");
}

const tablero = crearTablero(10, 10);
mostrarTablero(tablero);


const main = async () => {
  const numBarcos = parseInt(await input("Cuanto barcos desea colocar en el tablero?: "));
  console.log("");

  for (let i = 0; i < numBarcos; i++) {
    console.log(`BARCO NUMERO ${i + 1}`);
    const tamaño = parseInt(await input("Ingrese tamaño del barco: "));
    const orientacion = await input("Ingrese horientacion del barco: ");
    const fila = parseInt(await input("Ingrese fila donde posicionar el barco: "));
    const columna = parseInt(await input("Ingrese columna donde posicionar el barco: "));

    if (orientacion === "horizontal") {
      for (let j = 0; j < tamaño; j++) {
        tablero[fila][columna + j] = "X";
      }
      mostrarTablero(tablero);
    } else if (orientacion === "vertical") {
      for (let j = 0; j < tamaño; j++) {
        tablero[fila + j][columna] = "X";
      }
      mostrarTablero(tablero);
    }
  }

  rl.close(); 
};

main();