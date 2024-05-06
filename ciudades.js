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

  function Prob() {
    let rand = Math.random();
    if (rand < 0.25) return 0;  
    return 1;  
  }

  function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function crear_matriz_ciudades(num){
    const filas = [];
    for (let j = 0; j < num; j++) {
        const fila = [];
        for(let i = 0; i < num; i++){
            if(i != j) fila.push(Prob());
            if(i == j) fila.push(1);
        }
        filas.push(fila);
    }
    return filas;
}

function crear_matriz_costos(matriz){
    const fils = [];
    for (let j = 0; j < matriz.length; j++) {
        const fil = [];
        for(let i = 0; i < matriz.length; i++){
            if(matriz[j][i] == 1) fil.push(randint(1,10)*1000);
            if(matriz[j][i] != 1) fil.push("0   ");
        }                                 
        fils.push(fil);
    }
    return fils;
}

function Print_matriz(matriz, lista){
    console.log("   ", lista.join("  "))
    for(let i=0; i<matriz.length;i++){
        console.log(lista[i], matriz[i].join(" "))

    }
}
const main = async () => {
const ciudades = {};
const lista = []
const numCiudades = parseInt(await input("Ingrese el numero de ciudades: "))
for(let i = 0; i < numCiudades; i++){
    ciudades[i] = await input(`Ingrese nombre de ciudad ${i+1}/${numCiudades}: `)
    lista.push(ciudades[i].substr(0,3));
}
matrizCiudades = crear_matriz_ciudades(numCiudades);
matrizCostos = crear_matriz_costos(matrizCiudades)
console.log("")
Print_matriz(matrizCiudades, lista)
console.log("")
Print_matriz(matrizCostos, lista)
} 
main();