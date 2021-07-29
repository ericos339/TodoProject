import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import BrushIcon from "@material-ui/icons/Brush";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    width: "100%",
    maxWidth: "760px",
    backgroundColor: "inherit",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  text: {
    fontSize: "45px",
    height: "100%"
  },
  brush: {
    marginRight: "10px",
  },
}));
interface IGroupsList {
  handleGroupClick: (id: string) => void;
  handleRemoveGroup: (evt: React.SyntheticEvent, id: string) => void;
  handleOpenColorModal: (evt: React.SyntheticEvent, groupId: string) => void;
}
const GroupsList: React.FC<IGroupsList> = ({
  handleRemoveGroup,
  handleGroupClick,
  handleOpenColorModal,
}) => {
  const classes = useStyles();
  const todoGroups = useTypeSelector((state) => state.groupsList.todoGroups);
  return (
    <List className={classes.root}>
      {todoGroups.map(
        ({ groupName, id, totalCount, completedCount, color }) => {
          return (
            <Link key={id} className={classes.link} to={`/group/${id}`}>
              <ListItem
                role={undefined}
                className={classes.listItem}
                style={{ color: color }}
                onClick={() => handleGroupClick(id)}
                dense
                button
              >
                <BrushIcon
                  className={classes.brush}
                  onClick={(evt) => handleOpenColorModal(evt, id)}
                />
                <ListItemText
                  className={classes.text}
                  primary={`${groupName} (${completedCount} / ${totalCount})`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={(evt) => handleRemoveGroup(evt, id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        }
      )}
    </List>
  );
};

export default GroupsList;
