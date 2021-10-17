/**
 * The entry script for execution with Node. Creates the HTTP server and sets up server-level event handling.
 */

/**
 * register support for module aliases
 */
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    '@app': `${__dirname}/../app`,
});

/**
 * Module dependencies
 */
import debugLib from 'debug';
import http from 'http';
import { app } from '@app';

/** the port the server will run on, defaulting to 443 but provided in env */
const port = normalizePort(process.env.SERVER_PORT || '443');
app.set('port', port);

/** debug utility */
const debug: debugLib.Debugger = debugLib('ts-boiler-plate');

// server setup
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Convert port to a number
 *
 * @param val the port as a string
 */
function normalizePort(val: string): string | number | boolean {
    const p: number = parseInt(val, 10);

    if (isNaN(p)) {
        return val;
    }

    if (p >= 0) {
        return val;
    }

    return false;
}

/**
 * Error handler for the HTTP server
 *
 * @param error the error
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case 'EACCESS':
            debug(`${bind} requires elevated privileges`);
            process.exit(1);
            break;

        case 'EADDRINUSE':
            debug(`${bind} is already in use`);
            process.exit(1);
            break;

        default:
            throw error;
    }
}

/**
 * Event handler for HTTP 'listening'
 */
function onListening(): void {

    // init app

    const addr = server.address();
    let bind = '';

    if (typeof addr === 'string') {
        bind = `Pipe ${addr}`;
    }
    else if (addr) {
        bind = `Pipe ${addr.port}`;
    }

    debug(`Listening on ${bind}`);
}

export { server };
