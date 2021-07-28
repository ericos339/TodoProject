import { TodoGroupModel } from "../models/TodoGroupModel";
import { TodoItemEty } from "../mongodb/entities";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";

export const mapToEntity = (todoGroupModel: TodoGroupModel, todoGroupEty: TodoGroupEty): TodoGroupEty => {
    todoGroupEty.groupName = todoGroupModel.groupName;
    todoGroupEty.color = "Black";
    todoGroupEty.isDeleted = false;
    return todoGroupEty;
}

export const mapToModel = (todoGroupEty: TodoGroupEty): TodoGroupModel => {
    const model:TodoGroupModel = {
        groupName: todoGroupEty.groupName,
        color: todoGroupEty.color,
        id: todoGroupEty._id.toString(),
        completedCount: 0,
        totalCount: 0
    } 
    return model;
}