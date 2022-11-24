import { Request, Response } from "express"
// import Login from "../classes/Login";
import { User } from "../entities/User";
import { passwordHasher } from "../middlewares/hash";
import { UserRepository } from "../repositories/UserRepository";
import { createToken } from "../middlewares/token";
import { createAccount } from "./AccountController";
// import { AppDataSource } from "../data-source";

export const getUserByName = async (username: string) : Promise<User | undefined> => {
    // This function is never called directly by the FrontEnd, so it doesn't return a Response
    try {
        // const { username } = req.body;
        console.log('heres the username: ', username)
        if (username === undefined) throw undefined;
        const findUser = await UserRepository.findOneBy({ username });
        if (findUser === null) throw undefined;
        return findUser;
    } catch(e) {
        console.log(e)
        return undefined;
    }
};

export const createUser = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const { username, password } = req.body;

        const existUser = await getUserByName(username);
        if (existUser !== undefined) return res.status(400).json('Username already exists!');
        const accountId = await createAccount();
        if (accountId === undefined) throw undefined;

        const hashedPass = passwordHasher(password);
        const newUser= UserRepository.create({
            username: username,
            password: hashedPass,
        });
        // .create() instancia um novo objeto do tipo User

        newUser.account = accountId;
        // TypeScript alerta que não é possível fazer um newUser.account sem antes instanciar um Account por inteiro DENTRO de um User

        await UserRepository.save(newUser);
        // .save() salva de fato na Database o novo User
        return res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal oopsie" });
    }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body
        const hashedPass = passwordHasher(password)
        const findUser = await UserRepository.findOneBy({ username, password: hashedPass });
        if (findUser === null) return res.status(401).json({message: 'Incorrect Username or Password!'});
        const token = createToken({ username })
        const user = { 
            username,
            token, 
            accountId: findUser.account.id,
            balance: findUser.account.balance,
        }
        // Por conta do accountId eu tenho acesso à tabela inteira de Account que está ligada ao User, então dá pra pegar o balance por aqui mesmo
        return res.status(200).json(user)
    } catch(e) {
        console.log(e);
        return res.status(500).json({message: 'Internal server oopsie'})
    }
}
