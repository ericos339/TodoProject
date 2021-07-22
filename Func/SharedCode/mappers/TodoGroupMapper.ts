
import { ObjectID } from "typeorm";
import { TodoGroupModel } from "../models/TodoGroupModel";
import { TodoGroupEty } from "../mongodb/entities/TodoGroupEty";

export const mapToEntity = (todoGroupModel: TodoGroupModel, todoGroupEty: TodoGroupEty): TodoGroupEty => {
    todoGroupEty.groupName = todoGroupModel.groupName;
    todoGroupEty.color = "Black";
    todoGroupEty.isDeleted = false;
    return todoGroupEty;
}