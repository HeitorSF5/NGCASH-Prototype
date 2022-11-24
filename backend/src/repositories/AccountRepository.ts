import { AppDataSource } from "../data-source";
import { Account } from "../entities/Account";

export const AccountRepository = AppDataSource.getRepository(Account);
