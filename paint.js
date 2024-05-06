function desplegar_lienzo(lienzo) {
  for (let i = 0; i < lienzo.length; i++) {
    console.log(lienzo[i].join(""));
}
}

function pintar_punto(estado, c) {
  const [x, y] = c;
  const { lienzo, w, h } = estado;

  if (x < 1 || x > w || y < 1 || y > h) {
    return false;
  }

  lienzo[y - 1][x - 1] = estado.colorBrocha;
  return true;
}

function reemplazo(estado, colorOriginal, colorNuevo) {
  const { lienzo } = estado;

  for (let fila of lienzo) {
    for (let i in fila) {
      if (fila[i] === colorOriginal) {
        fila[i] = colorNuevo;
      }
    }
  }
}

function rotar(estado) {
  const { lienzo, w, h } = estado;
  const nuevoLienzo = Array.from({ length: w }, () => Array(h).fill(" "));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      nuevoLienzo[x][h - y - 1] = lienzo[y][x];
    }
  }

  estado.lienzo = nuevoLienzo;
  [estado.w, estado.h] = [estado.h, estado.w];
}

function diagonal(estado, c1) {
  const [x, y] = c1;
  const { lienzo, w, h } = estado;

  if (x < 1 || x > w || y < 1 || y > h) {
    return;
  }

  let x1 = x - 1, y1 = y - 1;
  while (x1 < w && y1 >= 0) {
    lienzo[y1][x1] = estado.colorBrocha;
    x1++;
    y1--;
  }
}

function cruz(estado, ccentro) {
  const [x, y] = ccentro;
  const { lienzo, w, h } = estado;

  if (x < 1 || x > w || y < 1 || y > h) {
    return;
  }

  for (let i = 0; i < w; i++) {
    lienzo[y - 1][i] = estado.colorBrocha;
  }

  for (let i = 0; i < h; i++) {
    lienzo[i][x - 1] = estado.colorBrocha;
  }
}

function histograma(estado) {
  const { lienzo } = estado;
  const colores = {};

  for (let fila of lienzo) {
    for (let celda of fila) {
      if (colores[celda]) {
        colores[celda]++;
      } else {
        colores[celda] = 1;
      }
    }
  }

  for (let color in colores) {
    console.log(`${color} ${colores[color]}`);
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const estado = {
  lienzo: [
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
  ],
  w: 10,
  h: 7,
  colorBrocha: 'N',
  colorFondo: 'B'
};
desplegar_lienzo(estado.lienzo);

function menu() {
  console.log('Seleccione una opción:');
  console.log('1. Desplegar lienzo');
  console.log('2. Pintar punto');
  console.log('3. Reemplazar color');
  console.log('4. Rotar');
  console.log('5. Diagonal');
  console.log('6. Cruz');
  console.log('7. Histograma');
  console.log('8. Salir');
}

function handleInput(input) {
  switch (input) {
    case '1':
      desplegar_lienzo(estado.lienzo);
      break;
    case '2':
      rl.question('Ingrese las coordenadas (x,y): ', (coordenadas) => {
        const [x, y] = coordenadas.split(',').map(Number);
        pintar_punto(estado, [x, y]);
        menu();
      });
      break;
    case '3':
      rl.question('Ingrese el color original: ', (colorOriginal) => {
        rl.question('Ingrese el color nuevo: ', (colorNuevo) => {
          reemplazo(estado, colorOriginal, colorNuevo);
          menu();
        });
      });
      break;
    case '4':
      rotar(estado);
      menu();
      break;
    case '5':
      rl.question('Ingrese las coordenadas (x,y): ', (coordenadas) => {
        const [x, y] = coordenadas.split(',').map(Number);
        diagonal(estado, [x, y]);
        menu();
      });
      break;
    case '6':
      rl.question('Ingrese las coordenadas (x,y): ', (coordenadas) => {
        const [x, y] = coordenadas.split(',').map(Number);
        cruz(estado, [x, y]);
        menu();
      });
      break;
    case '7':
      histograma(estado);
      menu();
      break;
    case '8':
      rl.close();
      break;
    default:
      console.log('Opción inválida');
      menu();
  }
}

menu();
rl.on('line', handleInput);