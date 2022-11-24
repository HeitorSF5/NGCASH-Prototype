import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity('Accounts')
export class Account {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'decimal', precision: 12, scale: 2, default: 100.00 })
	balance: number

	@OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
	creditedAccount: Transaction[]

	@OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
	debitedAccount: Transaction[]
}
