import * as errorHandler from "./actions";
import { ActionType, getType } from "typesafe-actions";
import * as error from "./actions";

const initialState = {
  error: "",
};

export const errors = (
  state = initialState,
  action: ActionType<typeof error>
) => {
  switch (action.type) {
    case getType(errorHandler.getError):
      return { ...state, error: action.payload };

    case getType(errorHandler.clearError):
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
