import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";

export const createAccount = async () : Promise<Account | undefined> => {
   try {
    const newAcc = AccountRepository.create();
    await AccountRepository.save(newAcc);
    // const { id } = newAcc;
    return newAcc;
    } catch(e) {
        console.log(e);
        return undefined
    }
}

export const getAccount = async (id: number) : Promise<Account | undefined> => {
    try {
        const findAcc = await AccountRepository.findOneBy({ id })
        // Implementar teste caso não ache
        if (findAcc === null) throw 'Account not found';
        return findAcc;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

// export const debitOnAccount  = async (id: number, balance: number) : Promise<true | false> => {
    
// }

// export const creditOnAccount = async (id: number, balance: number) : Promise<true | false> => {

// }