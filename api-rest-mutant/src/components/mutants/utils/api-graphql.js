'use strict';
import { client } from '../../../services/graphql'; 
import gql from 'graphql-tag';

// MODEL GQL
const STATS_QUERY = gql`
  query statsQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    stats(first: $first, skip: $skip, orderBy: $orderBy){
      count_mutant_dna,
      count_human_dna
    }
  }
`;

const POST_MUTANT = gql`mutation postMutant( $input: [String!]! ) {
    postMutant( input: { value: $input } ){
      id
    }
  }
`;

const POST_HUMAN = gql`mutation postHuman( $input: [String!]! ) {
    postHuman( input: { value: $input } ) {
      id
    }
  }
`;

const NEW_HUMAN_SUBSCRIPTION = gql`
  subscription {
    newHuman{
      id
    }
  }
`

const NEW_MUTANT_SUBSCRIPTION = gql`
  subscription {
    newMutant{
      id
    }
  }
`


/**
 * METODO PARA CREAR UNA SPECIE
 * @param {*} data 
 * @param {*} ismutant
 * ADMINISTRACION DATOS https://eu1.prisma.sh/facundo/api-graphql-mutant/dev/_admin 
 */
function postSpecie( data, ismutant ) {
  return new Promise( ( resolve, reject ) => {
    if(!data||ismutant===undefined)return reject('error');
    client.mutate({
      mutation: (ismutant)?POST_MUTANT:POST_HUMAN,
      variables: {
        input: data
      }
    })
    .then(result=>{
      resolve(result);
    })
    .catch(err=>reject(err) )
  } );
}

/**
 * METODO RETORNA DE BASE DE DATOS
 * ADMINISTRACION DATOS https://eu1.prisma.sh/facundo/api-graphql-mutant/dev/_admin
 */
function getStats() {
  
  return new Promise( ( resolve, reject ) => {
    wsSubcription();
    client.query({ query: STATS_QUERY } ).then( 
      (result) => resolve( 
        { count_mutant_dna: result.data.stats.count_mutant_dna, count_human_dna: result.data.stats.count_human_dna}   
      ),
      (err)=>reject()
    )
  } );
}

/**
 * Actualizar cache
 */
function wsSubcription() {
  client.watchQuery({ query: STATS_QUERY } ).subscribeToMore({
    document: NEW_HUMAN_SUBSCRIPTION
  });

  client.watchQuery({ query: STATS_QUERY } ).subscribeToMore({
    document: NEW_MUTANT_SUBSCRIPTION 
  });
}


module.exports = {
  postSpecie,
  getStats,
  wsSubcription
}