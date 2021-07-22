import { InsertOneWriteOpResult } from "typeorm";
import { TodoGroupModel } from "../models/TodoGroupModel";
import { createMongoConnection } from "../mongodb";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";

import * as mapper from "../mappers/TodoGroupMapper";

export class TodoGroupService {

  constructor() {
  }

  public async addTodoGroup(group:TodoGroupModel): Promise<InsertOneWriteOpResult> {
  
    const ety = new TodoGroupEty();

    let todoGroupEty = mapper.mapToEntity(group, ety);
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);

    const res = await repository.insertOne(todoGroupEty);
  
    return res;
  }

}

