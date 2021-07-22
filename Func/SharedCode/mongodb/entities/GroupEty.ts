import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity('Group')
export class GroupEty {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    groupName: string;

    @Column()
    color: string;

    @Column()
    isDeleted: boolean;
}