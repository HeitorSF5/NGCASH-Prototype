import { useNavigate } from "react-router";
import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { clearUserData, getUserData } from "../utilities/LocalUserData";
import api from "../services/api";
import Transaction from "../classes/transaction";
import { filterTransType, getUserTransactions, sortTransByDate } from "../components/TransactionList";
import '../styles/pages/generic.css';

const DEFAULT_DEPOSIT = 0;

function Profile() {
    const navigate = useNavigate();
    const [depositValue, setDepositValue] = useState<string>(DEFAULT_DEPOSIT.toFixed(2));
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [creditedUser, setCreditedUser] = useState<string>("");
    const [transList, setTransList] = useState<Transaction[]>([]);
    const [orderType, setOrderType] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("")
    const { username, token, balance, accountId } = getUserData();
    const noTransactions = transList.length < 1;

    const handleOrder = async (order: string): Promise<void> =>  setOrderType(order);
    const handleFilter = async (filter: string): Promise<void> => setFilterType(filter);

    const transListFetcher = async (id: number) => {
        const transactions = await getUserTransactions(id);
        setTransList(transactions);
    };

    const transListGenerator = (tList: Transaction[], order: string, filter: string) => {
        if (tList === undefined) return <p>You have no transactions!</p>

        const orderedList = sortTransByDate(tList, order)
        const filteredList = filterTransType(orderedList, filter, accountId)

        const allTransactions = filteredList.map((transaction) => (
            <li className="transactionItem">
                <div>
                    <p>CASH-OUT Account Nº{transaction.debitedAccount.id}</p>
                    <p>R${transaction.value}</p>
                    <p>CASH-IN Account Nº{transaction.creditedAccount.id}</p>
                    <p>Date: {transaction.createdAt.toString().slice(0, -14)}</p>
                </div>
            </li>
        ))
        return (
            <ul className="transactionList">
                { allTransactions }
            </ul>
        )
    };

    useEffect(() => {
        transListFetcher(accountId)
    }, [])
    //on load it fetches all transactions from the user
    

    useEffect(() => {
        if (
            parseFloat(depositValue) > balance ||
            parseFloat(depositValue) <= 0 ||
            creditedUser === "" ||
            creditedUser === username
        ) setDisabledSubmit(true);
        else setDisabledSubmit(false);
    }, [creditedUser, depositValue])
    // checks input field changes
    // Ignore "username" and "balance" alerts because those are supposed to be static until a real time Balance check with the DB is made

    const logOut = () => {
        clearUserData();
        navigate('/login')
    };

    const handleDeposit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await api.post('createTransaction', 
            {
                debitedUser: { accountId, balance },
                creditedUser: { username: creditedUser, value: parseFloat(depositValue) },
                authorization: token,
            });
            setResponseMessage("Deposit successful! Refresh to view new Transactions.")
            setDepositValue(DEFAULT_DEPOSIT.toFixed(2));
        } catch (error: any) {
            console.log(error);
            setResponseMessage(error.response.data.message)
        }
    };

    const transactionForm = () => {
        return (
            <form onSubmit={handleDeposit} className="formBody">
                <label htmlFor="creditedUser">
                    Deposit to: @ 
                    <input 
                        type="text"
                        value={ creditedUser }
                        onChange={ ({target}) => setCreditedUser(target.value) }
                    />
                </label>
                <label htmlFor="depositValue">
                    R$
                    <input
                        type="number"
                        step=".01"
                        min="0"
                        value={depositValue}
                        onChange={ ({target}) => setDepositValue(target.value) }
                    />
                </label>
                
                <button type="submit" disabled={disabledSubmit} >
                    Transfer
                </button>
            </form>
        )
    };

    const orderSelectElem = () => (        
        <select disabled={noTransactions}
            name="order"
            onChange={(e) => handleOrder(e.currentTarget.value)}
            >
            <option selected={true} disabled={true}>Order by...</option>                    
            <option value={"new"}>Newest</option>
            <option value={"old"}>Oldest</option>
        </select>
    );
    // https://stackoverflow.com/questions/33256274/typesafe-select-onchange-event-using-reactjs-and-typescript

    const filterSelectElem = () => (
        <select disabled={noTransactions}
            name="filter"
            onChange={(e) => handleFilter(e.currentTarget.value)}
            >
            <option selected={true} value={""}>All</option>                    
            <option value={"cashOut"}>Cash-Out</option>
            <option value={"cashIn"}>Cash-In</option>
        </select>
    )

    return (
        <main>
            <h1>{username}</h1>
            <h2>R${balance}</h2>
            <h3>Account Nº {accountId}</h3>
            <div>
                { transactionForm() }
                <p>{responseMessage}</p>
            </div>
            <div>
                { orderSelectElem() } { filterSelectElem() }
                { !noTransactions ? transListGenerator(transList, orderType, filterType) : <p>No transactions found!</p> }
            </div>
            <button id="logoutBtn" onClick={logOut}>Logout</button>
        </main>
    )
};

export default Profile;
