'use strict';
import {ApolloClient} from "apollo-client";
import fetch from "node-fetch";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import ws from 'ws';
import * as env from "../../env/enviroments";

const
  httpLink = createHttpLink({
    uri: env.uriHttp,
    fetch: fetch
  }),
  wsLink = new WebSocketLink({
    uri: env.uriWs,
    options: {
      reconnect: true,
    },
    webSocketImpl: ws
  }), 
  link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  ),
  client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
exports.client = client;
// ADMINISTRACIÓN BASE DE DATOS https://eu1.prisma.sh/facundo/api-graphql-mutant/dev/_admin