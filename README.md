# MUTANTS

_Desarrollo para detectar si un humano es mutante basándose en su secuencia de ADN. </br>
Un humano es mutante, si encuentra más de una secuencia de cuatro letras
iguales, de forma oblicua, horizontal o vertical._

## Comenzando 🚀

_Mediante consola: correr el comando git clone y la url del repositorio._

### Pre-requisitos 📋

_Que cosas necesitas para instalar las api's_

```
Git
Node > 10
```

### Instalación. Comandos comunes ( APiRest / APiGraphQl ) 🔧

Una vez que descargue los archivo, instale las dependencias.<br />

```
npm i 
```

Navegar hacia los directorios correspondientes. <br />
cd api-graphql-mutant <br />
&& <br />
cd api-rest-mutant <br />

```
npm start
```

## Ejecutando las pruebas para la API REST ⚙️
Comando para realizar pruebas de desarrollo ../api-rest-mutant.<br />

```
npm test
```

## Ejecutando test cobertura de código API REST ⚙️
Comando test cobertura de código ../api-rest-mutant.<br />

```
npm run coverage
```

## Compilar proyecto API REST ⚙️
Comando para compilar proyecto WebPack Babel<br />

```
npm run build
```

<!-- ## Despliegue 📦

Url Api REST: [https://api-rest-mutant.herokuapp.com/](https://api-rest-mutant.herokuapp.com/)

Url Api Graphql: [https://api-graphql-mutant.herokuapp.com/](https://api-graphql-mutant.herokuapp.com/)  -->

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

Servicio extra /stats devuelve un Json con las estadísticas de las
verificaciones de ADN: { “count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4 }
 
### Método GET → /api-docs

Documentación de la api e interfaz de prueba. Pantalla con dos metodos de prueba GET y POST. 

## Construido con 🛠️

_Herramientas para crear proyecto_

* [Node]
* [Apollo]
* [Prisma]
* [Express]
* [Swagger]
* [graphql]
* [jest]
* [supertest]
* [MySql]
* [WebPack]
* [Babel]

## Versionado 📌

Use [Git](https://github.com/) para el versionado. Para todas las versiones disponibles.

## Autor ✒️

* **Facundo Ferrari** - *Trabajo* - [GIT-HUB](https://github.com/FacundoF1)

## Gracias... 🎁

