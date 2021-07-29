import { PriorityEnm } from "../models/Enums/PriorityEnm";
import { TodoItemModel } from "../models/TodoItemModel";
import { TodoItemEty } from "../mongodb/entities";

export const mapToEntity = (todoItemModel: TodoItemModel, todoItemEty: TodoItemEty): TodoItemEty => {
  todoItemEty.todoName = todoItemModel.todoName,
  todoItemEty.isCompleted = false,
  todoItemEty.groupId = todoItemModel.groupId,
  todoItemEty.priority = "Medium",
  todoItemEty.deadline = new Date(todoItemModel.deadline),
  todoItemEty.expired = false
  return todoItemEty
}

export const mapToModel = ( todoItemEty: TodoItemEty): TodoItemModel => {
    const model:TodoItemModel = {
      todoName: todoItemEty.todoName,
      isCompleted: todoItemEty.isCompleted,
      id: todoItemEty._id.toString(),
      groupId: todoItemEty.groupId,
      priority: PriorityEnm[todoItemEty.priority],
      deadline: todoItemEty.deadline.toJSON(),
      expired: todoItemEty.expired
  }
 return model
}