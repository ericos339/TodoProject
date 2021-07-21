import React from "react";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { completeTodo, removeTodo } from "../redux/actions/group";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  completed: {
    textDecoration: "line-through",
  },
});

interface ITodo {
  todoName: string;
  id: number;
  completed: boolean | undefined;
  groupId: number;
}
const TodoItem: React.FC<ITodo> = ({ todoName, id, completed, groupId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRemoveButton = (todoId: number) => {
    dispatch(removeTodo({ groupId, todoId }));
  };

  const handleCompleteButton = (todoId: number) => {
    dispatch(completeTodo(todoId));
  };
  return (
    <ListItem key={id} role={undefined} dense button>
      <ListItemText
        primary={todoName}
        className={completed ? classes.completed : ""}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => handleCompleteButton(id)}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => handleRemoveButton(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
