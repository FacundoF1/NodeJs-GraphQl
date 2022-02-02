'use strict';

const 
    // 1
    { GraphQLServer } = require('graphql-yoga'), 
    { prisma } = require('../generated/prisma-client'),
    Query = require('./resolvers/Query'),
    Mutation = require('./resolvers/Mutation'),
    Subscription = require('./resolvers/Subscription'),
    Human = require('./resolvers/Human'),
    Mutant = require('./resolvers/Mutant'),
    Adn = require('./resolvers/Adn');
// 2     
const resolvers = {
        Query,
        Mutation,
        Subscription,
        Human,
        Mutant,  
        Adn
    };
// 3
const server = new GraphQLServer({
    typeDefs: './model/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },  
});
// {port: 80},
server.start( (e) => { console.log( `Servidor corriendo en http://localhost:${e.port}`); return e; } );
const startServer = async () => await server;  

module.exports = {
    startServer
}
