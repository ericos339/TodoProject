export interface IGroupModel {
  groupName: string;
  id: string;
  todoItems?: ITodoModel[];
  totalCount: number;
  completedCount: number;
  color: string;
}

export interface IGroupCreateModel {
  groupName: string;
}

export interface ITodoModel {
  todoName: string;
  id: string;
  isCompleted: boolean;
  priority: string;
  deadline: string;
  expired: boolean;
  groupName?: string;
  groupId: string;
}

export interface ITodoCreateModel {
  todoName: string;
  isCompleted: boolean;
  deadline: string;
}

export interface IGroupsState {
  todoGroups: IGroupModel[];
  isLoading?: boolean;
  error?: string;
  priorities?: string[];
  urgentTodos: ITodoModel[];
}

export interface IModal {
  isOpen: boolean;
  groupId: string;
}
