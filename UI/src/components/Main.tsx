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
import DeadlineList from "./DeadlineList";

const useStyles = makeStyles({
  roof: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    padding: "0 50px",
    position: "relative"
  },
  button: {
    backgroundColor: "#96e395",
    height: "40px",
    width: "200px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
  deadlineBox: {
    width: "800px",
    height: "500px",
    border: "1px solid black",
    borderRadius: "20px",
    boxSizing: "border-box",
    boxShadow: "3px 2px rgba(55,55,55,.4 )"
  },
  text: {
    fontSize: "32px",
    textAlign: "center"
  }
});

interface IMain {
  handleGroupClick: (id: string) => void;
  handleRemoveGroup: (evt: React.SyntheticEvent, id: string) => void;
  handleOpenColorModal: (evt: React.SyntheticEvent, groupId: string) => void;
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
        <h1 className={classes.text}>ToDo groups</h1>
        {todoGroups.length ? (
          <GroupsList
            handleGroupClick={handleGroupClick}
            handleRemoveGroup={handleRemoveGroup}
            handleOpenColorModal={handleOpenColorModal}
          />
        ) : (
          <h2 className={classes.subtitle}>У вас нет дел</h2>
        )}
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
      </Box>
     
      <Box className={classes.deadlineBox}>
        <h2 className={classes.text}>Список срочных дел</h2>
          <DeadlineList />
      </Box>
    </Container>
  );
};

export default Main;
