'use strict';
import express from 'express';
const router = express.Router(),
  mdValidate = require('../../middlewares/validation-middleware'),
  { postSpecies, statSpecies } = require('./controller');

/**
 * @swagger
 * paths:
 *  /mutant/:
 *    post:
 *      parameters:
 *        - in: body
 *          name: isMutant
 *          required: true
 *          schema:
 *              $ref: '#/components/schemas/Dna'
 *      tags:
 *        - Mutants
 *      summary: Validación y carga.
 *      description: Este endpoint para validación y carga de adn. si pasa la validacion retorna estado de respuesta '200||403' - 412 body del post con error.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: OK
 *          403:
 *             description: Validación y almacenamiento humano.
 *          500:
 *             description: Error en el servidor    
 */
router.post('/mutant/', mdValidate.isMutant, postSpecies);

/**
 * @swagger
 * paths:
 *  /stats:
 *    get:
 *      tags:
 *        - Mutants
 *      summary: Busqueda en base de datos.
 *      description: Exponer un servicio extra que devuelva un Json con las estadísticas de las verificaciones de ADN.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *             description: Ok
 *             schema:
 *              $ref: '#/components/schemas/Stats'
 *          500:
 *             description: Error en el servidor    
 */
router.get('/stats', statSpecies);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'API REST MUTANT' });
});

export default router;
