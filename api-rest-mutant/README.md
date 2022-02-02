# 1- API REST

API para validación y gestión de datos.

## Scripts

En el directorio del proyecto descargado moverse al directorio (cd ./api-rest-mutant), ejecutar los siguientes comandos:

### `npm i`

Una vez que descargue los archivo, instale las dependencias.

### `npm start`

Ejecutar la aplicación.<br />
Abrir [http://localhost:3000](http://localhost:3000) en el navegador.


## Ejecutando las pruebas para la API REST ⚙️
Comando para realizar pruebas de desarrollo ../api-rest-mutant.<br />

```
npm run test
```

## Compilar proyecto API REST ⚙️
Comando para compilar proyecto WebPack Babel<br />

```
npm run build
```

## Para el siguiente comando se necesita tener instalado pm2 - API REST ⚙️
Se ejecturan sentencias básicas en pm2 <br />

```
pm2 start
```

## Ejecutando test cobertura de código API REST ⚙️
Comando test cobertura de código ../api-rest-mutant.<br />

```
npm run coverage
```

## Inicio

Una vez que el proyecto este corriendo se vera una pantalla de bienvenida con un link a la documentación de la api donde se pueden realizar pruebas con la interfaz de usuario.

### Método POST → /mutant/
### body { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

Para su ejecución debe ingresar a la url indicada y rellenar el body de la cabecera HTTP con 
el formato específico. Si el parámetro dna tiene una longitud menor a uno la api devuelve error HTTP/412.

Este servicio /mutant/ es donde se pueda detectar si un humano es
mutante enviando la secuencia de ADN mediante un HTTP POST.
En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un
403-Forbidden.

### Método GET → /stats

Exponer un servicio extra /stats que devuelva un Json con las estadísticas de las
verificaciones de ADN: { “count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4 }

### Método GET → /api-docs

Documentación de la api e interfaz de prueba. Pantalla con dos metodos de prueba GET y POST. 