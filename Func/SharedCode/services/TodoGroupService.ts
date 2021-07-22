import { InsertOneWriteOpResult } from "typeorm";
import { createMongoConnection } from "../mongodb";
import { Group } from "../mongodb/entities/Group";

export class TodoGroupService {

  constructor() {
  }

  public async addProduct(): Promise<InsertOneWriteOpResult> {
  
    const ety = new Group();
    
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(Group);

    ety.color = "Black";
    ety.groupName = "First";
    ety.isDeleted = false;
    
    const res = await repository.insertOne(ety);
  
    return res;
  }

}

