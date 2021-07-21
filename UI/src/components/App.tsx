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
  const [isOpen, setOpen] = useState({ isOpen: false, groupId: 0 });
  const [color, setColor] = useState("black");

  const handleOpenColorModal = (evt: React.SyntheticEvent, id: number) => {
    evt.preventDefault();
    setOpen({
      isOpen: true,
      groupId: id,
    });
  };

  const handleCloseColorModal = () => {
    setOpen({ isOpen: false, groupId: 0 });
  };
  const handleCloseOnEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      setOpen({ isOpen: false, groupId: 0 });
    }
  };
  const handleColor = (color: string) => {
    dispatch(putGroupColor({ groupId: isOpen.groupId, color }));
  };

  const handleGroupClick = (id: number) => {
    dispatch(loadTodos(id));
  };

  const handleRemoveGroup = (evt: React.SyntheticEvent, id: number) => {
    evt.preventDefault();
    dispatch(removeGroup(id));
  };

  useEffect(() => {
    dispatch(loadGroups());
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
