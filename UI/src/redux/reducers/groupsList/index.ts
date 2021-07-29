import { IGroupsState, ITodoModel } from "../../../interfaces";
import * as todoActions from "../../actions/group";
import { ActionType, getType } from "typesafe-actions";

const initialState: IGroupsState = {
  todoGroups: [],
  urgentTodos: [],
};

export const groupsList = (
  state: IGroupsState = initialState,
  action: ActionType<typeof todoActions>
): IGroupsState => {
  let newGroups;
  switch (action.type) {
    case getType(todoActions.loadGroupsSuccess):
      return {
        ...state,
        todoGroups: action.payload,
        error: "",
      };

    case getType(todoActions.addGroupSuccess):
      return {
        ...state,
        todoGroups: [...state.todoGroups, action.payload],
        error: "",
      };

    case getType(todoActions.removeGroupSuccess):
      newGroups = state.todoGroups.filter(
        (group) => group.id !== action.payload
      );
      return { ...state, todoGroups: newGroups, error: "" };

    case getType(todoActions.putGroupColorSuccess):
      newGroups = state.todoGroups.map((item) => {
        if (item.id === action.payload.groupId) {
          item.color = action.payload.color;
        }
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

    case getType(todoActions.loadTodosSuccess):
      newGroups = state.todoGroups.map((item) => {
        if (item.id === action.payload.id) {
          item.todoItems = action.payload.model;
        }
        return item;
      });
      return {
        ...state,
        todoGroups: newGroups,
        error: "",
      };

      case getType(todoActions.loadUrgentTodosSuccess):
        return {
          ...state,
          urgentTodos: action.payload,
          error: "",
        };

    case getType(todoActions.addTodoSuccess):
      newGroups = state.todoGroups.map((item) => {
        if (item.id === action.payload.id) {
          item.todoItems?.push(action.payload.model);
          item.totalCount += 1;
        }
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

    case getType(todoActions.removeTodoSuccess):
      console.log(action);
      newGroups = [...state.todoGroups].map((item) => {
        if (item.id === action.payload.groupId) {
          console.log("xxx");
          item.totalCount -= 1;
          item.todoItems?.forEach((todo) => {
            if (todo.id === action.payload.todoId && todo.isCompleted) {
              item.completedCount -= 1;
            }
          });
        }
        item.todoItems = item.todoItems?.filter(
          (todo: ITodoModel) => todo.id !== action.payload.todoId
        );
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

    case getType(todoActions.completeTodoSuccess):
      newGroups = [...state.todoGroups].map((item) => {
        item.todoItems?.forEach((todo: ITodoModel) => {
          if (todo.id === action.payload) {
            todo.isCompleted = !todo.isCompleted;
            todo.isCompleted
              ? (item.completedCount += 1)
              : (item.completedCount -= 1);
          }
        });
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

      case getType(todoActions.changePriorityTodoSuccess):
      newGroups = [...state.todoGroups].map((item) => {
        item.todoItems?.forEach((todo: ITodoModel) => {
          if (todo.id === action.payload.todoId) {
            todo.priority = action.payload.priority;
          }
        });
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

      case getType(todoActions.changeDeadlineTodoSuccess):
      newGroups = [...state.todoGroups].map((item) => {
        item.todoItems?.forEach((todo: ITodoModel) => {
          if (todo.id === action.payload.todoId) {
            todo.deadline = action.payload.deadline;
          }
        });
        return item;
      });
      return { ...state, todoGroups: newGroups, error: "" };

      case getType(todoActions.loadPrioritiesSuccess):
        return {
          ...state,
          priorities: action.payload,
          error: "",
        };

    case getType(todoActions.spinnerStart):
      return { ...state, isLoading: true };

    case getType(todoActions.spinnerStop):
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
