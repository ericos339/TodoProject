import React from "react";
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
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles({
  completed: {
    textDecoration: "line-through",
  },
  formControl: {
    minWidth: "120px",
    marginRight: "100px"
  },
});

interface ITodo {
  todoName: string;
  id: string;
  completed: boolean | undefined;
  groupId: string;
  priority: string;
}
const TodoItem: React.FC<ITodo> = ({ todoName, id, completed, groupId, priority }) => {
  const classes = useStyles();
  const priorities = useTypeSelector(store => store.groupsList.priorities)
  const dispatch = useDispatch();
  const handleRemoveButton = (todoId: string) => {
    dispatch(removeTodo({ groupId, todoId }));
  };

  const handleCompleteButton = (todoId: string) => {
    dispatch(completeTodo(todoId));
  };

  
  const [age, setAge] = React.useState('');
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
        className={completed ? classes.completed : ""}
      />
      <FormControl className={classes.formControl}>
        <Select
          id="select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={2}
          onChange={evt => {
            evt.preventDefault(); 
            setAge(evt.target.value as string)
            const value = evt.target.value as string
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
