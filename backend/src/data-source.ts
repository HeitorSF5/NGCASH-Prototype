import 'reflect-metadata';
import { DataSource } from "typeorm";
const DB_PORT = 5432;


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: DB_PORT,
    username: 'ngcashadmin',
    password: 'secret',
    database: 'NGCASHPrototype',
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});

