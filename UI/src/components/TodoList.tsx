import React, { useEffect } from "react";
import { List } from "@material-ui/core";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { ITodoModel } from "../interfaces";

import TodoItem from "./TodoItem";
import { loadTodos } from "../redux/actions/group";
import { useDispatch } from "react-redux";

interface ITodo {
  id: string;
  inputSearch: string;
  radioValue: string;
}

const TodoList: React.FC<ITodo> = ({ id, inputSearch, radioValue }) => {
  const { todoGroups } = useTypeSelector((state) => state.groupsList);
  const todoItems = todoGroups.find((item) => item.id === id)?.todoItems;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!todoItems) {
      dispatch(loadTodos(id));
    }
  }, [todoGroups]);

  return (
    <List>
      {todoItems?.length ? (
        todoItems?.map(({ todoName, id, isCompleted, priority }: ITodoModel) => {
          if (!inputSearch && radioValue === "All") {
            return (
              <TodoItem
                todoName={todoName}
                id={id}
                completed={isCompleted}
                key={id}
                groupId={id}
                priority={priority}
              />
            );
          }
          if (inputSearch && todoName.startsWith(inputSearch)) {
            return (
              <TodoItem
                todoName={todoName}
                id={id}
                completed={isCompleted}
                groupId={id}
                key={id}
                priority={priority}
              />
            );
          }
          if (radioValue === "Undone" && !isCompleted) {
            return (
              <TodoItem
                todoName={todoName}
                groupId={id}
                id={id}
                completed={isCompleted}
                key={id}
                priority={priority}
              />
            );
          }
        })
      ) : (
        <h2>Дел пока нет</h2>
      )}
    </List>
  );
};

export default TodoList;
