import { createMongoConnection } from "../mongodb";
import { ObjectId } from "mongodb";
import * as mapper from "../mappers/TodoItemMapper";
import { TodoGroupEty, TodoItemEty } from "../mongodb/entities";
import { TodoItemModel } from "../models/TodoItemModel";

export class TodoItemService {

  constructor() {
  }

  public async addTodoItem(itemModel:TodoItemModel): Promise<TodoItemModel> {
  
    const connection = await createMongoConnection();

    const groupRepository = connection.getMongoRepository(TodoGroupEty);

    const todoGroupEty = await groupRepository.findOne({ where: { _id: new ObjectId(itemModel.groupId) }});

    todoGroupEty.todoItems.push(mapper.mapToEntity(itemModel))

    await groupRepository.save(todoGroupEty);

    return itemModel;
  }
}

