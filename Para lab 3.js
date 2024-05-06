//Como ejecutar el codigo:
//En la consola "node 'nombre del archivo'.js"

//Variables:
//Se usa "let" en las variables y "const" en las funciones.
let x = "hola mundo";

//Arrays:
//Son parecidos a python, Con ".push()" se agregan cosas y con ".pop()" se quitan cosas.
//Con ".splice(x)" quitas la x cosa del array y con ".sort()" ordenas cosas de menor a mayor / de "a" a "z"
//Para ordenar al reves se hace ".sort((a, b) => b - a);"
//Otras cosas importantes:
//".includes()" verifica si exise algo, ".indexOf()" te dice la posicion de algo.
//Para ver la cantidad de cosas se hace "console.log(list.length);"
//Uno importante para el lab (creo) es ".forEach()", que seria como el for de java. Puse un ejemplo de como funciona.
let list = ['manzana', 'platano', 'naranja'];

list.forEach(function(fruta, indice) {
    console.log(`Lugar ${indice}: ${fruta}`);
});


//Como imprimir texto:
console.log(x);

//Ejemplo de una funcion en java:
//Forma corta
const sum = (x, y) => x + y; //Lo que esta despues de la flecha es la funcion, lo que esta antes son las variables que pide.
console.log(sum(2, 3)); //Se llama a la funcion / variable reemplazando el x e y.

//Forma "larga"
function duplicate(x){ //Siempre es "function 'nombre de la funcion'" y el resto va entre {}
    return 2 * x;
}
console.log(duplicate(2));

//Otro ejemplo de funcion pero con strings:
const greet = name => `Hola, ${name}`; //Para añadir variables a un texto se usa `` y ${"variable"}.
console.log(greet("Pedro"));

//Como hacer inputs:
//Es mas complejo que python.
const readline = require('node:readline'); //IMPORTANTE, esto importa el readline. Basicamente importas el input al codigo.

const rl = readline.createInterface({ //IMPORTANTE TAMBIEN, rl va a ser la variable que nos deja recibir cosas de la consola
    input: process.stdin,
    output: process.stdout
});

rl.question('¿Cuál es tu nombre? ', (answer) => { //Esta linea seria como el input en python, excepto que lo que recibe solo se guarda en lo que este adentro de {}
    //Para preguntar mas cosas se tiene que hacer la misma linea de arriba pero con una variable diferente
    //Ej: rl.question('Ingrese su edad: ', (edad) => {});
    console.log(`Bienvenido: ${answer}`);
    rl.close(); //Una vez cerrado no se puede volver a usar, se tiene que abrir de nuevo.
});

