import { createAction } from "typesafe-actions";

export const getError = createAction("errorHandler/GET_ERROR")<string>();
export const clearError = createAction("errorHandler/CLEAR_ERROR")<string>();
