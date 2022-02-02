'use strict';
import request from "supertest";
const app = require( "../src/app" );
const { MUTANT_DNA_SEQUENCES, HUMAN_DNA_SEQUENCES } = require('../src/services/json/const.json');
    
describe('POST: Validar body vacío, que retorne error 412, validación del body /mutant/', function() {
    it('Test validación respuesta con json', function(done) {
        request(app)
        .post('/mutant/')
        .send({dna: ""})
        .set('Accept', 'application/json')
        .expect(412)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
});

describe('POST: se pasa una secuencia tipo MUTANTE /mutant/', function() {
    it('Retornar 200 OK ', function(done) {
      request(app)
        .post('/mutant')
        .send({dna: MUTANT_DNA_SEQUENCES})
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    }, 10000);
});

describe('POST: se pasa una secuencia tipo HUMANO /mutant/', function() {
    it('Respuesta con json', function(done) {
      request(app)
        .post('/mutant')
        .send({dna: HUMAN_DNA_SEQUENCES})
        .set('Accept', 'application/json')
        .expect(403)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    }, 10000);
});

describe('GET verificar estado 200 /stats', function() {
  it('Respuesta con json', function(done) {
    request(app)
      .get('/stats')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET verificar el objeto de retorno 200 /stats', function() {
  it('Respuesta con json', function(done) {
    request(app)
      .get('/stats')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET verificar el api-docs de retorno 200 /api-docs.json', function() {
  it('Respuesta con json', function(done) {
    request(app)
      .get('/api-docs.json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
