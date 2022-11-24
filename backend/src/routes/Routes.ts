import { Router } from "express";
import { createTransaction, getTransactionsById } from "../controllers/TransactionController";
import { createUser, login, } from "../controllers/UserController";
import { verifyAuthorization } from "../middlewares/authorization";
import { registerValidator } from "../middlewares/userValidation";


const routes = Router();

routes.post('/register', registerValidator, createUser);
routes.post('/login', login)
routes.post('/createTransaction', createTransaction)
routes.get('/myTransactions/:id', verifyAuthorization, getTransactionsById)

export default routes;
