import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
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
    width: "70%",
  },
  input: {
    marginBottom: "15px",
    backgroundColor: "#fff",
    height: "40px",
    width: "80%",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: "24px",
    paddingBottom: "40px",
  },
});

const TodoPage: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch("/group/:id");

  const [inputSearch, setInputSearch] = useState<string>("");
  const [inputTodo, setInputTodo] = useState<string>("");
  const [radioValue, setRadioValue] = React.useState("All");

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value);
  };

  const onEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter" && inputTodo) {
      const newGroup: ITodoCreateModel = {
        todoName: inputTodo,
        isCompleted: false,
      };

      dispatch(addTodo({ model: newGroup, id: +id }));
      setInputTodo("");
    }
  };

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
      <OutlinedInput
        value={inputTodo}
        onChange={handleTodoInput}
        className={classes.input}
        placeholder="Добавить"
        onKeyDown={onEnter}
        required={true}
      />
    </Container>
  );
};

export default TodoPage;
