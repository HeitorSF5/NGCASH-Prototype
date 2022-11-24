import { Request, Response } from "express"
import CreditedUser from "../classes/CreditedUser";
import DebitedUser from "../classes/DebitedUser";
import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { getAccount } from "./AccountController";
import { getUserByName } from "./UserController";
import { Equal } from "typeorm";

export const createTransaction = async (req: Request, res: Response) : Promise<Response> => {
    try {
        // const { creditedId, debitedId, value } = req.body;
        const { debitedUser, creditedUser } = req.body;
        const { accountId, balance }: DebitedUser = debitedUser;
        const { username, value }: CreditedUser = creditedUser;
        // balance is unused because there is no implementation to update the accounts' balance in the DB

        const findCreditedUser = await getUserByName(username);
        const debitedAccount = await getAccount(accountId);
        
        if (findCreditedUser === undefined) return res.status(404).json({message: 'User not found'})
        const creditedAccount = await getAccount(findCreditedUser.account.id)
        if (creditedAccount === undefined) return res.status(404).json({message: 'User does not have an Account!'})
        if (debitedAccount === undefined || creditedAccount === debitedAccount) return res.status(401).json({message: 'Bad Request'})

        console.log('heres the User: ', findCreditedUser);

        const newTransaction = TransactionRepository.create({ value });
        newTransaction.creditedAccount = creditedAccount;
        newTransaction.debitedAccount = debitedAccount;
        // Reminder: it passes two entire Account instance just to record the FKs in Transaction
        await TransactionRepository.save(newTransaction);

        // This is where I'd add a call to AccountController to update the balance in both Credited and Debited accounts.
        return res.status(201).json(newTransaction);
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal oopsie" });
    }
};

export const getTransactionsById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const findByAccId: Transaction[] = await TransactionRepository.findBy([{debitedAccount: Equal(parseInt(id))}, {creditedAccount: Equal(parseInt(id))}])
        // https://github.com/typeorm/typeorm/issues/8954
        return res.status(200).json(findByAccId)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Oopsie' })
    }
};
