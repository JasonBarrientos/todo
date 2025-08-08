import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'text',nullable:true})
    name:string;

    @Index()
    @Column({type:'text', unique:true})
    email:string;

    @Column({type:'text'})
    password:string;

    @Column({type:'bool',default:true})
    isActive:boolean;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @OneToMany(()=> Task, task=> task.user,{cascade:true,eager:true})
    tasks?: Task[]
}
