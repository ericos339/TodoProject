import { TodoItemModel } from "../models/TodoItemModel";
import { TodoItemEty } from "../mongodb/entities";

export const mapToEntity = (todoItemModel: TodoItemModel, todoItemEty: TodoItemEty): TodoItemEty => {
  todoItemEty.todoName = todoItemModel.todoName,
  todoItemEty.isCompleted = false,
  todoItemEty.groupId = todoItemModel.groupId
  return todoItemEty
}

export const mapToModel = ( todoItemEty: TodoItemEty): TodoItemModel => {
    const model:TodoItemModel = {
      todoName: todoItemEty.todoName,
      isCompleted: todoItemEty.isCompleted,
      id: todoItemEty._id.toString(),
      groupId: todoItemEty.groupId  
  }
 return model
}