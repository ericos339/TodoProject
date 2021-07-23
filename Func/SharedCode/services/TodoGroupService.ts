import { InsertOneWriteOpResult } from "typeorm";
import { TodoGroupModel } from "../models/TodoGroupModel";
import { createMongoConnection } from "../mongodb";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";
import { ObjectId } from "mongodb";

import * as mapper from "../mappers/TodoGroupMapper";

export class TodoGroupService {

  constructor() {
  }

  public async addTodoGroup(group:TodoGroupModel): Promise<TodoGroupModel> {
  
    const ety = new TodoGroupEty();

    const todoGroupEty = mapper.mapToEntity(group, ety);
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);

    const insertResult = await repository.insertOne(todoGroupEty);

    const todoGroupNew = await repository.findOne({ where: { _id: new ObjectId(insertResult.insertedId) }});
    return mapper.mapToModel(todoGroupNew);
  }

  public async getTodoGroups(): Promise<TodoGroupModel[]> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    const aggregate: Array<TodoGroupModel> = [];
    const res = await repository.aggregate(aggregate).toArray();
    
    return res.filter(item => item.isDeleted === false).map(item => mapper.mapToModel(item))
  
  }

  public async deleteTodoGroup(id: string): Promise<void> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    try {
      const ety = await repository.findOne({ where: { _id: new ObjectId(id) }});
      ety.isDeleted = true;
      await repository.save(ety);
    } catch (error) {
      console.error("TodoGroupService.deleteTodoGroup error", error);
      throw error;
    }
  }

  public async changeColorTodoGroup(id: string, color: string): Promise<TodoGroupModel> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    try {
      const ety = await repository.findOne({ where: { _id: new ObjectId(id) }});
      ety.color = color;
      await repository.save(ety);
      return mapper.mapToModel(ety);
    } catch (error) {
      console.error("TodoGroupService.ChangeColorTodoGroup error", error);
      throw error;
    }
  }
}

