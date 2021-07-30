import { TodoGroupModel } from "../models/TodoGroupModel";
import { createMongoConnection } from "../mongodb";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";
import { ObjectId } from "mongodb";

import * as mapper from "../mappers/TodoGroupMapper";
import { TodoItemService } from "./TodoItemService";

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
    const todoItems =  new TodoItemService();

    return await Promise.all(res.filter(groups => groups.isDeleted === false).map(async group => {
          
          const model = mapper.mapToModel(group)
          const todoItem = await todoItems.getTodoItems(group._id.toString())
          model.totalCount = todoItem.length
          model.completedCount = todoItem.filter(todo => todo.isCompleted === true).length
          return model
    })
    )
  }

  public async deleteTodoGroup(id: string): Promise<TodoGroupModel> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoGroupEty);
    try {
      const ety = await repository.findOne({ where: { _id: new ObjectId(id) }});
      ety.isDeleted = true;
      await repository.save(ety);
      return mapper.mapToModel(ety)
    } catch (error) {
      console.error("TodoGroupService.deleteTodoGroup error", error);
      throw error;
    }
  }
  public async getTodoGroup(): Promise<any> {
    const ety = new GroupEty();
    
  
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(GroupEty);
    let aggregate: Array<any> = [];
    const res = await repository.aggregate(aggregate).toArray();
  
    return res;
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

