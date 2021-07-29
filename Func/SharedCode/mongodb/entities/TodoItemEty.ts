import {Entity, ObjectIdColumn, Column } from "typeorm";
import {ObjectId } from 'mongodb';

@Entity('todoItems')
export class TodoItemEty {

    @ObjectIdColumn({ name: "_id" })
    _id: ObjectId;

    @Column()
    todoName: string;

    @Column()
    isCompleted: boolean;

    @Column()
    groupId: string;

    @Column()
    priority: string;

    @Column()
    deadline: Date;

    @Column()
    expired: boolean;
}