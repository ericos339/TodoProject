import { InsertOneWriteOpResult } from "typeorm";
import { Context } from "vm";
import { createMongoConnection } from "../mongodb";
import { GroupEty } from "../mongodb/entities/GroupEty";

export class TodoGroupService {

  constructor() {
  }

  public async addTodoGroup( groupName: string ): Promise<InsertOneWriteOpResult> {
  
    const ety = new GroupEty();
    
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(GroupEty);

    ety.color = 'black';
    ety.groupName = groupName;
    ety.isDeleted = false;
    
    const res = await repository.insertOne(ety);
  
    return res;
  }
  public async getTodoGroup(): Promise<any> {
    const ety = new GroupEty();
    
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(GroupEty);
    let aggregate: Array<any> = [];
    const res = await repository.aggregate(aggregate).toArray();
  
    return res;
  }

}

