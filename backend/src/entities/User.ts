import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

// V indica o nome da tabela se o parametro não for uma string vazia, caso contrario ficaria como "User", assim como a classe abaixo
@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    username: string

    @Column({ type: 'text' })
    password: string

    @OneToOne(() => Account, (account) => account.id, { eager: true })
    // "eager" faz com que a Foreign Key venha com queries do tipo Find
    @JoinColumn() // se nada for passado, JoinColumn vai assumir que a Primary Key é a desejada e irá renomear essa coluna como "columnId" automaticamente - nesse caso "accountId"
    account: Account
}
