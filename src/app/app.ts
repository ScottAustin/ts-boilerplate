/**
 * Module defining the Express instance used to configure the HTTP Server.
 *
 * Creates and configures the Express instance with gating and routes.
 */

/**
 * Module dependencies
 */
import express, { Application, NextFunction, Request, Response } from 'express';

/** The Express instance itself */
const app: Application = express();
process.title = 'ts-boiler-plate';

// configure json and urlencoded built-in middleware
app.use(express.json({ limit: '2MB' }));
app.use(express.urlencoded({ extended: false }));

// configure access
app.use((req: Request, res: Response, next: NextFunction): void => {

    // allow all origins (for now)
    res.header('Access-Control-Allow-Origin', '*');

    // allow specific headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization');

    // allow specific methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');

    next();
});


app.use(async (req: Request, res: Response, next: NextFunction) => {
    return next();
});


export { app };
