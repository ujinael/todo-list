import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
enum TodoStatus{
    PLANNED = "planned",EXECUTED = "executed"
}
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    description?: string
@Column({enum:TodoStatus,default:TodoStatus.PLANNED})

status?:TodoStatus

@Column()

plannedTo?:Date



@CreateDateColumn()
createdAt?:Date

@UpdateDateColumn()
updatedAt?:Date
}
