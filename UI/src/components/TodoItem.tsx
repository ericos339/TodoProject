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
  TextField,
} from "@material-ui/core";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { completeTodo, removeTodo, changePriorityTodo, changeDeadlineTodo } from "../redux/actions/group";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { PriorityEnm } from "../enums/priorityEnum";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  completed: {
    textDecoration: "line-through",
    width: "100px",
  },
  formControl: {
    minWidth: "120px",
    marginRight: "120px",
    marginLeft: "auto"
  },
  text: {
    width: "70px"
  },
  expired: {
  },
  date: {
    textAlign: "right",
    marginRight: '25px',
    width: "220px",
    marginLeft: "auto"
  },
  content: {
    flex: "none",
  },
  link: {
    width: "200px",
    textDecoration: "none",
    color: "#000",
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
  isUrgent?: boolean;
}

const TodoItem: React.FC<ITodo> = ({ todoName, id, completed, groupId, priority, deadline, expired, isUrgent = false }) => {
const dateFormated = dateFormat(new Date(deadline),"yyyy-mm-dd'T'HH:MM")

  const classes = useStyles();
  const priorities = useTypeSelector(store => store.groupsList.priorities)
  const [idxPriority, setIdxPriority] = useState(Object.values(PriorityEnm).indexOf(priority))
  const [updatedDeadline, setUpdatedDeadline] = useState(dateFormated)
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleRemoveButton = (todoId: string) => {
    dispatch(removeTodo({ groupId, todoId }));
  };

  const handleCompleteButton = (todoId: string) => {
    dispatch(completeTodo(todoId));
  };
  const handleDateClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedDeadline(evt.target.value)
   
  }
  const handleUpdateTodo = () => {
    dispatch(changeDeadlineTodo({todoId: id, deadline: updatedDeadline}))
    dispatch(changePriorityTodo({todoId: id, priority: idxPriority.toString()}))
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <ListItem key={id} role={undefined} dense>
      {
      isUrgent ? 
      <Link to={`/group/${groupId}`} className={classes.link}>
        <ListItemText
          primary={todoName}
        />
      </Link>
      : <ListItemText
      primary={todoName}
      className={completed ? classes.completed : classes.text}
    />
    }
      {expired && !isUrgent ? <ListItemText primary="Просрочено" className={classes.expired} /> : null }
      <TextField
          id="datetime-loca"
          type="datetime-local"
          className={classes.date}
          value={updatedDeadline}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateClick}
          required
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
        <IconButton onClick={() => handleUpdateTodo()}>
          <AutorenewIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
