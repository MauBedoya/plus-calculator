# Plus Calculator

Este proyecto tiene como objetivo añadir valor a un ejercicio básico, como lo es una "**calculadora básica**". Para lograrlo, se utilizan conceptos fundamentales de JavaScript, como el uso de distintos **módulos** para dividir el proyecto en partes, el almacenamiento de datos reutilizables mediante **Session Storage**, y características de la especificación **ES6+** y más.

[Live Preview]()

## Instalación

1. Clonar repositorio.

  ```bash
  git clone git@github.com:MauBedoya/plus-calculator.git
  ```

2. Instalación de dependencias.

  ```bash
  npm install
  ```

3. Visualización desktop/mobile.

  ```bash
  npm run serve
  ```

## Tecnologías

- HTML, CSS
- JavaScript
- Vite

## Características

A continuación se presenta un listado de las características actuales y algunas ideas adicionales que podrían añadirse en el futuro.

### Visuales

- Pantalla que muestre las variables guardadas.
- Ventana modal que muestra información.

#### Ideas a futuro

- Historial de operaciones.
- Menu de ajuste de opciones funcionales, por ejemplo, el número de cifras significativas.

### Funcionales

- Reconocimiento de entrada de valores **mediante teclado o botones** de manera fluida.
- Reconocimiento de **errores de sintaxis**.
- Memoria de guardado de variables aplicando **Session Storage**
  - Guardado mediante botón "SET", ejemplos:
    - X**SET**10 (asigna el valor "**10**" a la variable "**X**")
    - Y**SET**ANS (asigna el valor de "**ANS**" a la variable "**Y**")

#### Ideas a futuro

- Ajuste de **cifras significativas**.
- Operaciones con **Potencias**.
- Uso de entradas mediante **notación científica** (Nx10^n).

## Issues

### Precision de números decimales

En el proyecto, se enfrenta un problema debido a la falta de precisión que JavaScript presenta en algunas operaciones aritméticas.

Para solucionarlo se evalúan dos caminos:

- Uso de "**parseFloat().toFix()**", de esta manera se toma una string, se la convierte en un "number" y se ajusta la cantidad de números decimales. Al aplicar este método, todos los resultados, tengan o no el problema de precision, se mostrarían con la misma cantidad de decimales.
- Uso de biblioteca: [**decimal.js-light**](https://github.com/MikeMcl/decimal.js-light/), usando esta biblioteca, se tendría que refactorizar la manera en la cual se realizan las operaciones en la calculadora.
