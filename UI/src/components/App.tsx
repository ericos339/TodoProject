import React, { useEffect, useState } from "react";
import Main from "./Main";
import "fontsource-roboto";
import { CircularProgress, Container, makeStyles } from "@material-ui/core";
import TodoPage from "./TodoPage";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadGroups,
  loadTodos,
  removeGroup,
  putGroupColor,
  loadPriorities,
  loadUrgentTodos,
} from "../redux/actions/group";
import { useTypeSelector } from "../hooks/useTypeSelector";
import ErrorHandler from "./errorHandler/ErrorHandler";
import ColorPickerModal from "./ColorPickerModal";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#cfe8fc",
    height: "100vh",
    padding: "50px 0",
    alignItems: "center",
  },
  spinner: {
    position: "absolute",
    zIndex: 500,
    top: "40%",
    left: "50%",
  },
  error: {
    position: "absolute",
    top: "30px",
    left: "32%",
    color: "red",
  },
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { groupsList, errors } = useTypeSelector((state) => state);
  const [isOpen, setOpen] = useState({ isOpen: false, groupId: '' });
  const [color, setColor] = useState("black")

  const handleOpenColorModal = (evt: React.SyntheticEvent, id: string) => {
    evt.preventDefault();
    setOpen({
      isOpen: true,
      groupId: id,
    });
  };

  const handleCloseColorModal = () => {
    setOpen({ isOpen: false, groupId: "" });
  };
  const handleCloseOnEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      dispatch(putGroupColor({ groupId: isOpen.groupId, color }))
      setOpen({ isOpen: false, groupId: "" });
    }
  };
  const handleColor = (color: string) => {
    setColor(color)
  };

  const handleGroupClick = (id: string) => {
    dispatch(loadTodos(id));
  };

  const handleRemoveGroup = (evt: React.SyntheticEvent, id: string) => {
    evt.preventDefault();
    dispatch(removeGroup(id));
  };

  useEffect(() => {
    dispatch(loadGroups());
    dispatch(loadPriorities());
    dispatch(loadUrgentTodos(5))
  }, []);

  return (
    <Container className={classes.root}>
      <ErrorHandler error={errors.error} />
      {groupsList.isLoading ? (
        <CircularProgress className={classes.spinner} />
      ) : null}
      <Switch>
        <Route exact path="/">
          <Main
            handleOpenColorModal={handleOpenColorModal}
            handleGroupClick={handleGroupClick}
            handleRemoveGroup={handleRemoveGroup}
          />
        </Route>
        <Route path="/group/:id">
          <TodoPage />
        </Route>
      </Switch>
      <ColorPickerModal
        isOpen={isOpen}
        handleClose={handleCloseColorModal}
        handleColor={handleColor}
        onEnter={handleCloseOnEnter}
      />
    </Container>
  );
};

export default App;
