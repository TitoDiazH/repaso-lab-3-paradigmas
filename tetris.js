function dimensionesPieza(pieza) {
    let filas = pieza.length;
    let columnas = pieza[0].length;
  
    // Buscar la máxima longitud de fila
    for (let i = 0; i < pieza.length; i++) {
      columnas = Math.max(columnas, pieza[i].length);
    }
  
    return [filas, columnas];
  }
  
  function desplegarAreaJuego(areaJuego, puntaje) {
    let filas = areaJuego.length;
    let columnas = areaJuego[0].length;
  
    console.log((Array(columnas + 2).fill("*")).join(""));
    for (let i = 0; i < filas; i++) {
      console.log("*", areaJuego[i].join(""), "*");
    }
    console.log((Array(columnas + 2).fill("*")).join(""));
    console.log("Puntaje:", puntaje);
  }
  
  function moverPieza(direccion, posicionPrueba = { ...posicionPieza }) {
    let nuevaPosicion = { ...posicionPrueba };
  
    if (direccion === 'izquierda') {
      nuevaPosicion.x--;
    } else if (direccion === 'derecha') {
      nuevaPosicion.x++;
    } else if (direccion === 'abajo') {
      nuevaPosicion.y++;
    }
  
    // Verificar colisión con paredes y fondo
    const [filas, columnas] = dimensionesPieza(piezaActual);
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (piezaActual[i][j] !== 0) {
          const nuevaX = nuevaPosicion.x + j;
          const nuevaY = nuevaPosicion.y + i;
  
          if (nuevaX < 0 || nuevaX >= areaJuego[0].length || nuevaY >= areaJuego.length || (nuevaY >= 0 && areaJuego[nuevaY][nuevaX] !== 0)) {
            return false; // Colisión detectada, no mover la pieza
          }
        }
      }
    }
  
    // Mover la pieza si no hay colisión
    if (direccion !== 'abajo' || posicionPrueba === posicionPieza) {
      posicionPieza = nuevaPosicion;
    }
    return true;
  }
  
  function romperFilas(areaJuego) {
    let puntaje = 0;
    const filasCompletas = [];
  
    // Encontrar filas completas
    for (let i = 0; i < areaJuego.length; i++) {
      const fila = areaJuego[i];
      if (fila.every(valor => valor !== 0)) {
        filasCompletas.push(i);
      }
    }
  
    switch (filasCompletas.length) {
      case 1:
        puntaje = 50;
        break;
      case 2:
        puntaje = 120;
        break;
      case 3:
        puntaje = 200;
        break;
      case 4:
        puntaje = 300;
        break;
    }
  
    for (let i = filasCompletas.length - 1; i >= 0; i--) {
      areaJuego.splice(filasCompletas[i], 1);
      areaJuego.unshift(new Array(areaJuego[0].length).fill(0));
    }
  
    return puntaje;
  }
  
  function guardarPartida(dc, nombre, areaJuego, puntaje) {
    dc[nombre] = {
      area_juego: areaJuego.map(fila => [...fila]),
      puntaje: puntaje
    };
  }
  
  function cargarPartida(dc, nombre) {
    const partida = dc[nombre];
    if (partida) {
      return {
        area_juego: partida.area_juego.map(fila => [...fila]),
        puntaje: partida.puntaje
      };
    }
    return null;
  }
  
  function rotar90(pieza) {
    const [filas, columnas] = dimensionesPieza(pieza);
    const piezaRotada = Array.from({ length: columnas }, () =>
      new Array(filas).fill(0)
    );
  
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        piezaRotada[j][filas - i - 1] = pieza[i][j];
      }
    }
  
    return piezaRotada;
  }
  
  // Matriz de piezas de Tetris
  const piezas = [
    [[1, 1], [1, 1]], // Pieza cuadrada
    [[2, 0, 0], [2, 2, 2]], // Pieza L
    [[0, 0, 3], [3, 3, 3]], // Pieza L invertida
    [[4, 4, 4, 4]], // Pieza barra
    [[5, 5, 0], [0, 5, 5]], // Pieza Z
    [[0, 6, 6], [6, 6, 0]], // Pieza S
    [[0, 7, 0], [7, 7, 7]] // Pieza T
  ];
  
  let areaJuego = Array.from({ length: 20 }, () => Array(10).fill(0)); // Área de juego 20x10
  let puntaje = 0;
  let piezaActual = piezas[Math.floor(Math.random() * piezas.length)]; // Pieza inicial aleatoria
  let posicionPieza = { x: 3, y: 0 }; // Posición inicial de la pieza
  let finJuego = false;
  
  function dibujarPieza() {
    // Limpiar área de juego
    for (let i = 0; i < areaJuego.length; i++) {
      areaJuego[i].fill(0);
    }
  
    // Dibujar pieza actual
    const [filas, columnas] = dimensionesPieza(piezaActual);
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (piezaActual[i][j] !== 0) {
          const nuevaY = posicionPieza.y + i;
          const nuevaX = posicionPieza.x + j;
          if (nuevaY >= 0 && nuevaX >= 0 && nuevaY < areaJuego.length && nuevaX < areaJuego[0].length) {
            areaJuego[nuevaY][nuevaX] = piezaActual[i][j];
          }
        }
      }
    }
  
    desplegarAreaJuego(areaJuego, puntaje);
  }
  
  function nuevaPieza() {
    piezaActual = piezas[Math.floor(Math.random() * piezas.length)]; // Pieza aleatoria
    posicionPieza = { x: 3, y: 0 }; // Posición inicial de la pieza
  
    // Verificar si hay colisión al inicio
    const [filas, columnas] = dimensionesPieza(piezaActual);
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (piezaActual[i][j] !== 0) {
          const nuevaX = posicionPieza.x + j;
          const nuevaY = posicionPieza.y + i;
          if (nuevaY >= 0 && areaJuego[nuevaY][nuevaX] !== 0) {
            finJuego = true; // Fin del juego si hay colisión al inicio
            return;
          }
        }
      }
    }
  }
  
  function rotarPieza() {
    piezaActual = rotar90(piezaActual);
    dibujarPieza();
  }

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function jugarTetris() {
    dibujarPieza();
  
    if (finJuego) {
      console.log(`Fin del juego. Puntaje final: ${puntaje}`);
      readline.close();
      return;
    }
  
    readline.question('Rotar? (0) 0 (1) 90 (2) 180 (3) 270: ', (rotacion) => {
      if (rotacion === '1') {
        rotarPieza();
      }
      // Implementar rotación adicional si es necesario
  
      dibujarPieza(); // Mostrar la pieza después de la rotación
  
      readline.question('Donde ubicar? [1-10]: ', (columna) => {
        const nuevaPosicion = parseInt(columna) - 1;
        if (nuevaPosicion >= 0 && nuevaPosicion < areaJuego[0].length) {
          posicionPieza.x = nuevaPosicion;
  
          // Encontrar la posición final de la pieza
          let posicionFinal = { ...posicionPieza };
          while (moverPieza('abajo', posicionFinal)) {
            // Continuar moviendo la pieza hacia abajo hasta que no se pueda
          }
  
          // Dibujar la pieza en su posición final
          posicionPieza = posicionFinal;
          dibujarPieza();
  
          // Verificar y eliminar filas completas
          puntaje += romperFilas(areaJuego);
  
          // Generar una nueva pieza
          nuevaPieza();
  
          // Continuar el juego
          jugarTetris();
        } else {
          console.log('Posición inválida. Intente nuevamente.');
          jugarTetris();
        }
      });
    });
  }
  
  jugarTetris();