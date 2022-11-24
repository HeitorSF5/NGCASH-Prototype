import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/Routes";
export const BACKEND_PORT = 3001;
import 'reflect-metadata';
import cors from 'cors';

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cors());
    app.use(routes);
    return app.listen(BACKEND_PORT, () => console.log('Listening on port:', BACKEND_PORT));
})