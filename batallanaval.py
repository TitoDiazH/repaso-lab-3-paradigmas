def crear_tablero(a, b):
    filas = {}
    for j in range(0, b):
        filas[j] = ["."] * a
    return filas

def mostrar_tablero(tablero):
    for i in range(len(tablero)):
        print(tablero[i])
    print("")

tablero = crear_tablero(10, 10)
mostrar_tablero(tablero)

num_barcos = int(input("Cuanto barcos desea colocar en el tablero?: "))
print("")
for i in range(0,num_barcos):
    print(f"BARCO NUMERO {i+1}")
    tamaño = int(input("Ingrese tamaño del barco: "))
    orientacion = input("Ingrese horientacion del barco: ")
    fila = int(input("Ingrese fila donde posicionar el barco: "))
    columna = int(input("Ingrese columna donde posicionar el barco"))

    if orientacion == "horizontal":
        for i in range(0,tamaño):
            tablero[fila][columna+i] = "X"
        mostrar_tablero(tablero)

    if orientacion == "vertical":
        for i in range(0,tamaño):
            tablero[fila+i][columna] = "X"
        mostrar_tablero(tablero)