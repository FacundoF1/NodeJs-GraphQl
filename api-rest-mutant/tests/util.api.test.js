"use strict";
const 
    { isMutant, isValidateAdn} = require("../src/components/mutants/utils/isMutant"),
    { postSpecie, getStats } = require("../src/components/mutants/utils/api-graphql"),
    { MUTANT_DNA_SEQUENCES, HUMAN_DNA_SEQUENCES } = require('../src/services/json/const.json');


test("Validar Secuencia condición == MUTANTE", () => {
    expect( isMutant( MUTANT_DNA_SEQUENCES ) ).toBe(true);
})

test("Validar Secuencia condición == HUMAN", () => {
    expect( isMutant( HUMAN_DNA_SEQUENCES ) ).toBe(false);
})

test("Prueba validación de segmento. Se le pasa una segmento correcto debe devolver -> True", () => {
    expect( isValidateAdn( 'AAAA' ) ).toBe(true);
})

test("Prueba validación de segmento. Se le pasa una segmento incorrecto debe devolver -> False", () => {
    expect( isValidateAdn( 'ASFA' ) ).toBe(false);
})

test('Validar valores del objeto, deben ser mayores que cero.', async () => {
    getStats().then( data => {
        expect( data.count_mutant_dna ).toBeGreaterThan(-1);
        expect( data.count_human_dna ).toBeGreaterThan(-1);
    });
})

test('Petición validación secuencia humano -> Devolver', async () => {
    postSpecie( HUMAN_DNA_SEQUENCES, false ).then( data => {
        expect( data );
    })
})

test('Petición con error. No se le pasa ningún parametro -> retorna un error', () => {
    expect(postSpecie()).rejects.toEqual('error');
})
