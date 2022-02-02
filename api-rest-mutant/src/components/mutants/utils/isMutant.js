'use strict';

/**
 * Validacion de secuencias de adn
 * @param {*} data
 * @returns boolean 
 */
function isMutant( data ) {
    if( !data || data.length < 0 ) return false;
    let isMutant = 0;
    for( var i = 0; i < data.length; i++ ) {
        for ( 
            var j = 0;  
            (j < data[i].length)
                &&
            (
                (data[i+3]?true:false && data[i][j+3]?true:false && data[i][j]===data[i][j+3]) ||
                (data[i+3]?true:false && data[i+3][j+3]?true:false && data[i][j]===data[i+3][j+3]) ||
                (data[i-3]?true:false && data[i-3][j+3]?true:false && data[i][j]===data[i-3][j+3]) ||
                (data[i+3]?true:false && data[i+3][j-3]?true:false && data[i][j]===data[i+3][j-3]) ||
                (data[i-3]?true:false && data[i-3][j-3]?true:false && data[i][j]===data[i-3][j-3]) ||
                (data[i+3]?true:false && data[i+3][j]?true:false && data[i][j]===data[i+3][j])
            ); 
            j++ 
        ) {
            if( isMutant > 1 )return isMutant > 1; 
            // VERTICAL 
            if( data[i][j]===data[i][j+3] ){
                if( isValidateAdn( data[i][j].concat( data[i][ j+1 ],data[i][ j+2 ],data[i][ j+3 ] ) ) ) { 
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            } 
            // DIAGONAL descendente derecho
            else if ( data[i+3] && data[i+3][j+3] && data[i][j]===data[i+3][j+3] ){
                if( isValidateAdn( data[i][j].concat( data[i+1][ j+1 ],data[i+2][ j+2 ],data[i+3][ j+3 ] ) ) ) {  
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            } 
            // DIAGONAL descendente izquierdo
            else if( data[i-3] && data[i-3][j+3] && data[i][j]===data[i-3][j+3] ) {
                if( isValidateAdn( data[i][j].concat( data[i-1][ j+1 ],data[i-2][ j+2 ], data[i-3][ j+3 ] ) ) ) { 
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            }
            // DIAGONAL ascendente derecho
            else if( data[i+3] && data[i+3][j-3] && data[i][j]===data[i+3][j-3] ) {
                if( isValidateAdn( data[i][j].concat( data[i+1][ j-1 ],data[i+2][ j-2 ], data[i+3][ j-3 ] ) ) ) { 
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            }
            // DIAGONAL ascendente izquierdo
            else if( data[i-3] && data[i-3][j-3] && data[i][j]===data[i-3][j-3] ) {
                if( isValidateAdn( data[i][j].concat( data[i-1][ j-1 ],data[i-2][ j-2 ], data[i-3][ j-3 ] ) ) ) { 
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            }
            // HORIZONTAL
            else if ( data[i+3] && data[i][j]===data[i+3][j] ) {
                if( isValidateAdn( data[i][j].concat( data[i+1][ j ],data[i+2][ j ], data[i+3][ j ] ) ) ) { 
                    isMutant++; if( isMutant > 1 )return isMutant > 1; break; 
                }
            }
        }
        if( i+1 === data.length ) return isMutant > 1;  
    }
}

/**
 * Validacion secuencia consecutiva de letras
 * @param {*} adn 
 * @returns boolean 
 */
function isValidateAdn( adn ) {
    // retorna verdadero si encuentra alguna coincidencia.
    return ( "AAAA" === adn || "CCCC" === adn || "GGGG" === adn ||  "TTTT" === adn );
}

module.exports = {
    isValidateAdn,
    isMutant
}