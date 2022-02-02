'use strict';
import { postSpecie, getStats } from './utils/api-graphql';
import { isMutant } from './utils/isMutant';

/**
 * 
 * Servicio /mutant/ en donde se pueda detectar si un humano es mutante. 
 * Secuencia de ADN. HTTP POST con un Json el cual tenga el siguiente formato:
 * POST → /mutant/ { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }
 * Estado: Mutante: HTTP 200-OK, NoMutante: 403-Forbidden
 * 
 * @param {*} req 
 * @param {*} res 
 */
function postSpecies( req, res ) {
    if( !req.body || !req.body.dna ) return res.status( 500 ).send( { ok: false } ); 
    const ismutant = isMutant( req.body.dna );
    return postSpecie( req.body.dna, ismutant )
        .then( () => {
            (ismutant) 
                ? res.status( 200 ).send( 'OK' )
                : res.status( 403 ).send( 'Forbidden' );   
        }).catch( (err)=>{
            res.status( 500 ).send( { ...err, isMutant: ismutant } );        
        });
}

/**
 * 
 * Anexar una base de datos, la cual guarde los ADN’s verificados con la API.
 * Solo 1 registro por ADN.
 * Retornar ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}
 * 
 * @param {*} req 
 * @param {*} res 
 */
function statSpecies( req, res ) {
    return getStats().then( (response) => {
        return res.status( 200 ).send( {
            ...response, 
            ratio: (response.count_mutant_dna>0&&response.count_human_dna>0)
                ? Number((response.count_mutant_dna/response.count_human_dna).toFixed(2))
                : 0
        } ); 
    }).catch( (err)=>{
        res.status( 500 ).send( err );        
    });
}

module.exports = {
    postSpecies,
    statSpecies
};