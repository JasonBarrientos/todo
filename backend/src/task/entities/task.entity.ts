import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'tasks'})
export class Task {

        @ApiProperty()
        @PrimaryGeneratedColumn('uuid')
        id: string;

        @ApiProperty()
        @Index()
        @Column({ type: 'text' })
        title: string;

        @ApiProperty()
        @Column({ type: 'text', nullable: true })
        description: string;

        @ApiProperty()
        @Index()
        @Column({ default: false })
        is_done: boolean;

        @ApiProperty()
        @Index()
        @Column({ type: 'int', default: 1 })
        priority: number;

        @ApiProperty()
        @Column({ type: 'date', nullable: true })
        due_date: Date

        @ApiProperty()
        @CreateDateColumn()
        createdAt: Date;

        @ApiProperty()
        @UpdateDateColumn()
        updatedAt: Date;

        @ApiProperty()
        @ManyToOne(() => User, user => user.tasks,{onDelete: 'CASCADE'})
        user: User
}
