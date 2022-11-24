import Transaction from "../classes/transaction";
import api from "../services/api";
import { getUserData } from "../utilities/LocalUserData"

export const sortTransByDate = (tList: Transaction[], order: string) : Transaction[] => {
    if (order === "old") return tList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    else return tList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
};
// https://bobbyhadz.com/blog/typescript-sort-array-of-objects-by-date#:~:text=To%20sort%20an%20array%20of,the%20date%20in%20the%20first.

// https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function

export const filterTransType = (tList: Transaction[], filter: string, id: number): Transaction[] => {
    if (filter === "cashIn") return tList.filter((transaction) => transaction.creditedAccount.id === id)
    else if (filter === "cashOut") return tList.filter((transaction) => transaction.debitedAccount.id === id)
    return tList;
};

export const getUserTransactions = async (id: number): Promise<Transaction[]> => {
    const { token } = getUserData();
    try {
        const fetchTransactions = await api.get(`myTransactions/${id}`, {
            headers: { Authorization: token }
        })
        console.log('heres your Transaction fetch: ',fetchTransactions.data);
        return await fetchTransactions.data;
    } catch(error: any) {
        return error.response.data.message
    };
};
