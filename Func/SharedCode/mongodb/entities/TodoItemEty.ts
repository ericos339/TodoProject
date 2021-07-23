import {Entity, ObjectIdColumn, Column} from "typeorm";
import {ObjectId } from 'mongodb';

@Entity('todoItem')
export class TodoItemEty {

    @ObjectIdColumn({ name: "_id" })
    _id?: ObjectId;

    @Column()
    todoName: string;

    @Column()
    isCompleted: boolean;
}