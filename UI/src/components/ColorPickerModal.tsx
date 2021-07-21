import { HexColorPicker } from "react-colorful";
import { makeStyles, Modal, DialogContent } from "@material-ui/core";
import React from "react";
import { IModal } from "../interfaces";
import { useTypeSelector } from "../hooks/useTypeSelector";

interface IColorListModal {
  handleClose: () => void;
  handleColor: (color: string) => void;
  isOpen: IModal;
  onEnter: (evt: React.KeyboardEvent) => void;
}
const useStyles = makeStyles(() => ({
  colorPicker: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: "none",
    paddingTop: "30px",
  },
}));

const ColorPickerModal: React.FC<IColorListModal> = ({
  isOpen,
  handleClose,
  handleColor,
  onEnter,
}) => {
  const classes = useStyles();
  const group = useTypeSelector((state) =>
    state.groupsList.todoGroups.filter((group) => group.id === isOpen.groupId)
  );
  return (
    <Modal
      open={isOpen.isOpen}
      onClose={handleClose}
      onKeyPress={onEnter}
      className={classes.modal}
    >
      <DialogContent className={classes.content}>
        <HexColorPicker
          color={group[0]?.color}
          onChange={handleColor}
          className={classes.colorPicker}
        />
      </DialogContent>
    </Modal>
  );
};

export default ColorPickerModal;
