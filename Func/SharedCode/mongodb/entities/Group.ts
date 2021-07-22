import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Group {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    groupName: string;

    @Column()
    color: string;

    @Column()
    isDeleted: boolean;
}