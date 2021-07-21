import { combineReducers } from "redux";
import { groupsList } from "./groupsList";
import { errors } from "../../components/errorHandler/reducers";

export const rootReducer = combineReducers({
  groupsList,
  errors,
});

export type RootState = ReturnType<typeof rootReducer>;
