import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity('Transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Account, (account) => account.creditedAccount, { eager: true })
    @JoinColumn([
      { referencedColumnName: "id" }
    ])
    creditedAccount: Account

    @ManyToOne(() => Account, (account) => account.debitedAccount, { eager: true })
    @JoinColumn([
      { referencedColumnName: "id" }
    ])
    debitedAccount: Account

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 100.00 })
    value: number

    @CreateDateColumn({ default: () => "CURRENT_DATE" })
    createdAt: Date
}
