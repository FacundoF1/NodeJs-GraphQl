'use strict';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import env from '../../env/enviroments';
// const configSwaggerJsdoc = require( './doc.dev' ); 
const
  { uriHttp } = require("../../env/enviroments"),
  options = {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null
    },
    swaggerDefinition: {
      // "openapi": configSwaggerJsdoc.openapi,
      // "info": configSwaggerJsdoc.info,
      // "tags": configSwaggerJsdoc.tags, 
      // "components": configSwaggerJsdoc.components,
      // "paths": configSwaggerJsdoc.paths,
      // // "host": `${uriHttp}`, 
      "openapi": "3.0.0",
      "info": {
        "title": "API REST Mutantes",
        "version": "1.1.0",
        "description": "Documentación Api Rest de Desafio Mutantes",
        "contact": {
          "name": "Facundo Ferrari", 
          "email": "facundof1@hotmail.com.ar",
          "url": "https://github.com/FacundoF1/",
        },
        "license": {
          "name": "MIT",
          "url": "https://opensource.org/licenses/MIT"
        }
      },
      "tags": [
        {
          "name": "Mutants"
        }
      ], 
      "components": {
        "schemas": {
          "dna": { 
            "type": "string", 
            "example": "AGSDFDSF", 
            "description": "Segmento del Adn" 
          },
          "Dna": { 
            "type": "object",
            "properties": {
              "dna": { 
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/dna"
                }
              }
            }   
          },
          "Stats": { 
            "type": "object",
            "properties": {
              "count_mutant_dna": { 
                "type": "number", 
                "example": "0", 
                "description": "Total de mutantes validados y almacenados." 
              },
              "count_human_dna": { 
                "type": "number", 
                "example": "0", 
                "description": "Total de humanos validados y almacenados." 
              },
              "ratio": { 
                "type": "number", 
                "example": "0", 
                "description": "Estadísticas de las verificaciones de ADN. (count_mutant_dna/count_human_dna)" 
              }
            }   
          }
        }
      },
      "paths": {  
        "/mutant/": {  
          "post": {
            "produces": ["application/json"],
            "parameters": [{
              "name": "isMutant",
              "in": "body",
              "schema": { "$ref": "#/components/schemas/Dna" },
              "required": true,
            }],
            "tags": ["Mutants"],            
            "summary": "Validación y carga.",
            "description": "Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta 200||403 - 412 body del post con error.",
            "responses": {
              "200": { "description": "OK" },
              "403": { "description": "Validación y almacenamiento humano." },
              "500": { "description": "Error en el servidor"}
            }
          }
        },
        "/stats": {
          "get": {
            "tags": ["Mutants"],
            "summary": "Busqueda en base de datos.",
            "description": "Exponer un servicio extra que devuelva un Json con las estadísticas de las verificaciones de ADN.",
            "produces": ["application/json"],
            "responses": { 
              "200": {
                "description": "Ok",
                "schema": { "$ref": "#/components/schemas/Stats" }
              },
              "500": { "description": "Error en el servidor" } 
            }
          }   
        }
      },
      "host": env.swagger.host,  
      "basePath": "/"
    },
    apis: ['./components/mutants/routes/**.js', '../../routes/endpoints.js'],
  };

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // serve swagger  
  app.get('/api-docs.json', function(req, res) { // line 41
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  app.get('/api-docs/*', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui.css', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-init.js', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-bundle.js', ...swaggerUi.serve);
  app.get('/api-docs/swagger-ui-standalone-preset.js', ...swaggerUi.serve);
  app.get('/api-docs/favicon-32x32.png', ...swaggerUi.serve); 
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}