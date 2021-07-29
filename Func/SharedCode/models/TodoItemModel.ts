import { PriorityEnm } from "./Enums/PriorityEnm";

export interface TodoItemModel {
  id: string;
  groupId: string;
  isCompleted: boolean;
  todoName: string;
  priority: PriorityEnm; 
  deadline: string;
  expired: boolean;
}