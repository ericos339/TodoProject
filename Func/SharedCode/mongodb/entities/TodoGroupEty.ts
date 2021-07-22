import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity('group')
export class TodoGroupEty {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    groupName: string;

    @Column()
    color: string;

    @Column()
    isDeleted: boolean;
}