import { TodoItemModel } from "../models/TodoItemModel";
import { TodoItemEty } from "../mongodb/entities";

export const mapToEntity = (todoItemModel: TodoItemModel): TodoItemEty => {
  return{
    todoName: todoItemModel.todoName,
    isCompleted : false
  }
}
export const mapToModel = ( todoItemEty: TodoItemEty): TodoItemModel => {
 return { 
  todoName: todoItemEty.todoName,
  isCompleted: todoItemEty.isCompleted,
  id: todoItemEty._id,
  // groupId: todoItemEty.todoGroup._id
}
}