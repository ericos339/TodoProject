import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { addTodo } from "../redux/actions/group";
import { useDispatch } from "react-redux";
import TodoList from "./TodoList";
import { ITodoCreateModel } from "../interfaces";

const useStyles = makeStyles({
  roof: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  input: {
    marginBottom: "15px",
    backgroundColor: "#fff",
    height: "40px",
    width: "60%",
    marginRight: "20px"
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: "24px",
    paddingBottom: "40px",
  },
  textField: {
    width: "230px",
    marginBottom: "20px",
  },
  container: {
    marginTop: "50px",
    display: 'flex',
    alignItems: "center"
  },
});

const TodoPage: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch("/group/:id");

  const [inputSearch, setInputSearch] = useState<string>("");
  const [inputTodo, setInputTodo] = useState<string>("");
  const [radioValue, setRadioValue] = React.useState("All");
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const { id }: { id?: string } = match!.params;
  if (!id) {
    return null;
  }
  const handleSearchInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(evt.target.value);
  };

  const handleTodoInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(evt.target.value);
  };
  const handleDateInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value);
  };

const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault()
  const newGroup: ITodoCreateModel = {
    todoName: inputTodo,
    isCompleted: false,
    deadline: date,
  };
  if(inputTodo && date){
    dispatch(addTodo({ model: newGroup, id }));
    setInputTodo("")
    setDate('')
  }
}
console.log(date)
  return (
    <Container className={classes.roof}>
      <Link className={classes.link} to="/">
        На главную
      </Link>
      <OutlinedInput
        value={inputSearch}
        onChange={handleSearchInput}
        className={classes.input}
        placeholder="Search..."
      />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="filter"
          name="filter"
          value={radioValue}
          onChange={handleChange}
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="Undone" control={<Radio />} label="Undone" />
        </RadioGroup>
      </FormControl>
      <TodoList id={id} inputSearch={inputSearch} radioValue={radioValue} />
      <form className={classes.container} noValidate onSubmit={onSubmit}>
        <OutlinedInput
          value={inputTodo}
          onChange={handleTodoInput}
          className={classes.input}
          placeholder="Добавить"
          required
        />
        <TextField
          id="datetime-local"
          label="Deadline"
          type="datetime-local"
          className={classes.textField}
          value={date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateInput}
          required
        />
      </form>.
    </Container>
  );
};

export default TodoPage;
