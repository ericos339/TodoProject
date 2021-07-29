import { takeLatest, put, call, StrictEffect } from "redux-saga/effects";

import * as api from "../../utils/Api";
import * as todoGroupActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import * as errorActions from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

export function* loadUrgentTodosSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoGroupActions.loadUrgentTodos), loadUrgentTodos);
}

function* loadUrgentTodos(action: ReturnType<typeof todoGroupActions.loadUrgentTodos>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(api.getUrgentTodos, action.payload);
    yield put(todoGroupActions.loadUrgentTodosSuccess(data));
  } catch (err) {
    yield put(errorActions.getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}

export default loadUrgentTodosSaga;
