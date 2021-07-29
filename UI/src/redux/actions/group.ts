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

export const removeGroup = createAction("todoGroup/REMOVE_GROUP")<string>();

export const removeGroupSuccess = createAction(
  "todoGroup/REMOVE_GROUP_SUCCESS"
)<string>();

export const loadTodos = createAction("todoGroup/LOAD_TODOS")<string>();

export const loadTodosSuccess = createAction("todoGroup/LOAD_TODOS_SUCCESS")<{
  model: ITodoModel[];
  id: string;
}>();

export const loadUrgentTodos = createAction("todoGroup/LOAD_URGENT_TODOS")<number>();

export const loadUrgentTodosSuccess = createAction("todoGroup/LOAD_URGENT_TODOS_SUCCESS")<ITodoModel[]>();

export const addTodo = createAction("todoGroup/ADD_TODO")<{
  model: ITodoCreateModel;
  id: string;
}>();

export const addTodoSuccess = createAction("todoGroup/ADD_TODO_SUCCESS")<{
  model: ITodoModel;
  id: string;
}>();

export const removeTodo = createAction("todoGroup/REMOVE_TODO")<{
  groupId: string;
  todoId: string;
}>();

export const removeTodoSuccess = createAction("todoGroup/REMOVE_TODO_SUCCESS")<{
  groupId: string;
  todoId: string;
}>();

export const putGroupColor = createAction("todoGroup/PUT_GROUP_COLOR")<{
  groupId: string;
  color: string;
}>();
export const putGroupColorSuccess = createAction(
  "todoGroup/PUT_GROUP_COLOR_SUCCESS"
)<{
  groupId: string;
  color: string;
}>();

export const completeTodo = createAction("todoGroup/COMPLETE_TODO")<string>();

export const completeTodoSuccess = createAction(
  "todoGroup/COMPLETE_TODO_SUCCESS"
)<string>();

export const loadPriorities = createAction(
  "todoGroup/LOAD_PRIORITIES"
)();
export const loadPrioritiesSuccess = createAction(
  "todoGroup/LOAD_PRIORITIES_SUCCESS"
)<string[]>();

export const changePriorityTodo = createAction("todoGroup/CHANGE_PRIORITY_TODO")<{
  todoId: string;
  priority: string;
}>();

export const changePriorityTodoSuccess = createAction(
  "todoGroup/CHANGE_PRIORITY_TODO_SUCCESS"
)<{
  todoId: string;
  priority: string;
}>();

export const changeDeadlineTodo = createAction('todoGroup/CHANGE_DEADLINE_TODO')<{
  todoId: string,
  deadline: string
}>();

export const changeDeadlineTodoSuccess = createAction('todoGroup/CHANGE_DEADLINE_TODO_SUCCESS')<{
  todoId: string,
  deadline: string
}>();

export const spinnerStart = createAction("spinner/SPINNER_START")();

export const spinnerStop = createAction("spinner/SPINNER_STOP")();
