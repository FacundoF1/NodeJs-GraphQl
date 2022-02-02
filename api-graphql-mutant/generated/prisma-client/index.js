"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Mutant",
    embedded: false
  },
  {
    name: "Human",
    embedded: false
  },
  {
    name: "Adn",
    embedded: false
  },
  {
    name: "Sequence",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/facundo/api-graphql-mutant/dev`
});
exports.prisma = new exports.Prisma();
