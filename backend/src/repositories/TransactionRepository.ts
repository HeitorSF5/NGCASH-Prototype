import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/Transaction";

export const TransactionRepository = AppDataSource.getRepository(Transaction);
