import { InsertOneWriteOpResult, ObjectID } from "typeorm";
import { TodoGroupModel } from "../models/TodoGroupModel";
import { createMongoConnection } from "../mongodb";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";
import { ObjectId } from "mongodb";

import * as mapper from "../mappers/TodoGroupMapper";

export class TodoGroupService {

  constructor() {
  }

  public async addTodoGroup(group:TodoGroupModel): Promise<InsertOneWriteOpResult> {
  
    const ety = new TodoGroupEty();

    const todoGroupEty = mapper.mapToEntity(group, ety);
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);

    const res = await repository.insertOne(todoGroupEty);
  
    return res;
  }

  public async getTodoGroups(): Promise<TodoGroupModel[]> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    const ety = await repository.findOne({ where: { _id: new ObjectId("60f971f0780b66cc77eba542") } });
    const aggregate: Array<TodoGroupModel> = [];
    const res = await repository.aggregate(aggregate).toArray();
    
    return res.map(item => mapper.mapToModel(item))
  
  }

  public async deleteTodoGroup(id: string): Promise<void> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    try {
      const ety = await repository.findOne({ where: { _id: new ObjectId(id) } });
      ety.isDeleted = true;
      await repository.save(ety);
    } catch (error) {
      console.error("TodoGroupService.deleteTodoGroup error", error);
      throw error;
    }
  }
}

