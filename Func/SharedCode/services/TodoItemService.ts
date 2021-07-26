import { createMongoConnection } from "../mongodb";
import { ObjectId } from "mongodb";
import * as mapper from "../mappers/TodoItemMapper";
import { TodoItemEty } from "../mongodb/entities";
import { TodoItemModel } from "../models/TodoItemModel";

export class TodoItemService {

  constructor() {
  }

  public async addTodoItem(itemModel:TodoItemModel): Promise<TodoItemModel> {

    const ety = new TodoItemEty();

    const todoItemEty = mapper.mapToEntity(itemModel, ety);
  
    const connection = await createMongoConnection();
    const itemRepository = connection.getMongoRepository(TodoItemEty);
    const insertResult = await itemRepository.insertOne(todoItemEty);
    const todoItemNew = await itemRepository.findOne({ where: { _id: new ObjectId(insertResult.insertedId) }});
    return mapper.mapToModel(todoItemNew);
  }

  public async getTodoItems(groupId: String): Promise<TodoItemModel[]> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoItemEty);
    const aggregate: Array<TodoItemModel> = [];
    const res = await repository.aggregate(aggregate).toArray();
    return res.filter(item => item.groupId === groupId).map(item => mapper.mapToModel(item))
  }

  public async deleteTodoItem(id: string): Promise<void> {
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoItemEty);
    try {
     await repository.delete(new ObjectId(id));
    } catch (error) {
      console.error("TodoGroupService.deleteTodoGroup error", error);
      throw error;
    }
  }

  public async changeCompletedStatus(id: string): Promise<TodoItemModel> {
    
    const connection = await createMongoConnection();
    const repository = connection.getMongoRepository(TodoItemEty);
    try {
      const ety = await repository.findOne({ where: { _id: new ObjectId(id) }});
      ety.isCompleted = !ety.isCompleted;
      await repository.save(ety);
      return mapper.mapToModel(ety);
    } catch (error) {
      console.error("TodoGroupService.ChangeColorTodoGroup error", error);
      throw error;
    }
  }
}

