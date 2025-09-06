import { Task } from "src/modules/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    name: string;

    @Column({ type: 'text', unique:true})
    nickname: string;

    @Index()
    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' , select: false })
    password: string;

    @Column({ type: 'bool', default: true , select: false })
    isActive: boolean;

    @CreateDateColumn({type: 'date', select: false })
    createAt: Date;

    @UpdateDateColumn({type: 'date' , select: false })
    updateAt: Date;

    @Column({ array: true, type: 'text', default: ['user'] })
    roles: string[]

    @OneToMany(() => Task, task => task.user, { cascade: true, eager: true })
    tasks?: Task[]
}
