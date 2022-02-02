'use strict';
/**
 * Module dependencies.
 */
import app from '../app';
import debugLib  from 'debug';
const debug = debugLib('api-rest-mutant:server');
import http from 'http';
import cluster from 'cluster';
import env from "../env/enviroments";
import numCPUs from 'os';

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort( process.env.PORT || env.PORT );
app.set('port', port);

/** BALANCE DE CARGA */
if (cluster.isMaster) {
  
  // Fork workers.
  for (var i = 0; i < numCPUs.cpus().length; i++) {
    cluster.fork();
  }

  // console.log('BALANCE DE CARGA NUM CPUS *: ', numCPUs);

  // If a worker dies, log it to the console and start another worker.
  cluster.on('exit', function(worker, code, signal) {
    // console.log('Worker ' + worker.process.pid + ' died.');
    cluster.fork();
  });

  // Log when a worker starts listening
  cluster.on('listening', function(worker, address) {
    // console.log('Worker started with PID ' + worker.process.pid + '.');
  });

} 
else {

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, (e) => {console.log('Server run PORT: ', port)});
server.on('error', onError);
server.on('listening', onListening);

}

/** END CLUSTER */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
