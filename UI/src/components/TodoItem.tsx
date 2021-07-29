import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { completeTodo, removeTodo, changePriorityTodo } from "../redux/actions/group";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { PriorityEnm } from "../enums/priorityEnum";

const useStyles = makeStyles({
  completed: {
    textDecoration: "line-through",
  },
  formControl: {
    minWidth: "120px",
    marginRight: "100px"
  },
  text: {
    width: "100px",
  }
});

interface ITodo {
  todoName: string;
  id: string;
  completed: boolean | undefined;
  groupId: string;
  priority: string;
  deadline: string;
  expired: boolean;
}

const TodoItem: React.FC<ITodo> = ({ todoName, id, completed, groupId, priority, deadline, expired}) => {
  const classes = useStyles();
  const priorities = useTypeSelector(store => store.groupsList.priorities)
  const [idxPriority, setIdxPriority] = useState(Object.values(PriorityEnm).indexOf(priority))

  const dispatch = useDispatch();
  const handleRemoveButton = (todoId: string) => {
    dispatch(removeTodo({ groupId, todoId }));
  };

  const handleCompleteButton = (todoId: string) => {
    dispatch(completeTodo(todoId));
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <ListItem key={id} role={undefined} dense button>
      <ListItemText
        primary={todoName}
        className={completed ? classes.completed : classes.text}
      />
      {expired ? <ListItemText primary="Просроченно" /> : null }
      <ListItemText 
        primary={`${new Date(deadline).toLocaleDateString()} ${new Date(deadline).toLocaleTimeString()}`}
      />
      <FormControl className={classes.formControl}>
        <Select
          id="select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={idxPriority}
          onChange={evt => {
            evt.preventDefault(); 
            const value = evt.target.value as string
            setIdxPriority(+value)
            dispatch(changePriorityTodo({todoId: id, priority: value}))
          }}
        >
          {priorities?.map((item, idx) => {
            return <MenuItem key={idx} value={idx}>{item}</MenuItem>
          })}
        </Select>
      </FormControl>
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
