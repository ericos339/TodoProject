import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import { IGroupCreateModel } from "../interfaces";
import GroupsList from "./GroupsList";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { addGroup } from "../redux/actions/group";

const useStyles = makeStyles({
  roof: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  button: {
    backgroundColor: "#96e395",
    height: "40px",
    maxWidth: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "200px",
  },
  input: {
    marginBottom: "15px",
    backgroundColor: "#fff",
    height: "40px",
    width: "100%",
  },
  box: {
    maxWidth: "360px",
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    marginTop: "50%",
  },
  error: {
    color: "red",
  },
});

interface IMain {
  handleGroupClick: (id: number) => void;
  handleRemoveGroup: (evt: React.SyntheticEvent, id: number) => void;
  handleOpenColorModal: (evt: React.SyntheticEvent, groupId: number) => void;
}

const Main: React.FC<IMain> = ({
  handleRemoveGroup,
  handleGroupClick,
  handleOpenColorModal,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const { todoGroups } = useTypeSelector((state) => state.groupsList);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleAddGroupSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const newGroup: IGroupCreateModel = {
      groupName: inputValue,
    };
    dispatch(addGroup(newGroup));
    setInputValue("");
  };

  return (
    <Container className={classes.roof}>
      <Box className={classes.box}>
        <h1>ToDo groups</h1>
        {todoGroups.length ? (
          <GroupsList
            handleGroupClick={handleGroupClick}
            handleRemoveGroup={handleRemoveGroup}
            handleOpenColorModal={handleOpenColorModal}
          />
        ) : (
          <h2 className={classes.subtitle}>У вас нет дел</h2>
        )}
      </Box>
      <form className={classes.form} onSubmit={handleAddGroupSubmit}>
        <OutlinedInput
          id="component-outlined"
          value={inputValue}
          onChange={handleInput}
          className={classes.input}
          required={true}
        />
        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Container>
  );
};

export default Main;
