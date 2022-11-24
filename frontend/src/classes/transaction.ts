export default class Transaction {
    id: number
    debitedAccount: { id: number, balance: number }
    creditedAccount: { id: number, balance: number }
    value: number
    createdAt: Date
};
