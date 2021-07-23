import {Entity, ObjectIdColumn, Column} from "typeorm";
import {ObjectId } from 'mongodb';
import { TodoItemEty } from "./TodoItemEty";

@Entity('group')
export class TodoGroupEty {

    @ObjectIdColumn({ name: "_id" })
    _id: ObjectId;

    @Column()
    groupName: string;

    @Column()
    color: string;

    @Column()
    isDeleted: boolean;

    @Column()
    todoItems: TodoItemEty[];
}