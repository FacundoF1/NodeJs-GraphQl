'use strict';
import request from "supertest";
import app from "../src/app";

describe('GET: Validar ruta deber retornar error 404', function() {
    it('Test validación return 404', function(done) {
        request(app)
        .get('/as;dlaskdksd')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res) {
            done(err);
        });
    }, 10000);
});