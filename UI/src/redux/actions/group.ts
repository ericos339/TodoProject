import {
  IGroupCreateModel,
  IGroupModel,
  ITodoCreateModel,
  ITodoModel,
} from "../../interfaces";
import { createAction } from "typesafe-actions";

export const loadGroups = createAction("todoGroup/LOAD_GROUPS")();

export const loadGroupsSuccess = createAction("todoGroup/LOAD_GROUPS_SUCCESS")<
  IGroupModel[]
>();

export const addGroup = createAction(
  "todoGroup/ADD_GROUP"
)<IGroupCreateModel>();

export const addGroupSuccess = createAction(
  "todoGroup/ADD_GROUP_SUCCESS"
)<IGroupModel>();

export const removeGroup = createAction("todoGroup/REMOVE_GROUP")<number>();

export const removeGroupSuccess = createAction(
  "todoGroup/REMOVE_GROUP_SUCCESS"
)<number>();

export const loadTodosSuccess = createAction("todoGroup/LOAD_TODOS_SUCCESS")<{
  model: ITodoModel[];
  id: number;
}>();

export const loadTodos = createAction("todoGroup/LOAD_TODOS")<number>();

export const addTodo = createAction("todoGroup/ADD_TODO")<{
  model: ITodoCreateModel;
  id: number;
}>();

export const addTodoSuccess = createAction("todoGroup/ADD_TODO_SUCCESS")<{
  model: ITodoModel;
  id: number;
}>();

export const removeTodo = createAction("todoGroup/REMOVE_TODO")<{
  groupId: number;
  todoId: number;
}>();

export const removeTodoSuccess = createAction("todoGroup/REMOVE_TODO_SUCCESS")<{
  groupId: number;
  todoId: number;
}>();

export const putGroupColor = createAction("todoGroup/PUT_GROUP_COLOR")<{
  groupId: number;
  color: string;
}>();
export const putGroupColorSuccess = createAction(
  "todoGroup/PUT_GROUP_COLOR_SUCCESS"
)<{
  groupId: number;
  color: string;
}>();

export const completeTodo = createAction("todoGroup/COMPLETE_TODO")<number>();

export const completeTodoSuccess = createAction(
  "todoGroup/COMPLETE_TODO_SUCCESS"
)<number>();

export const spinnerStart = createAction("spinner/SPINNER_START")();

export const spinnerStop = createAction("spinner/SPINNER_STOP")();
