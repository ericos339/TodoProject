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
  date: string;
}

export interface ITodoCreateModel {
  todoName: string;
  isCompleted: boolean;
  date: string;
}

export interface IGroupsState {
  todoGroups: IGroupModel[];
  isLoading?: boolean;
  error?: string;
  priorities?: string[]
}

export interface IModal {
  isOpen: boolean;
  groupId: string;
}
