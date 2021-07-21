import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";
import * as api from "../../utils/Api";
import * as todoActions from "../actions/group";
import { getError } from "../../components/errorHandler/actions";
import { spinnerStart, spinnerStop } from "../actions/group";
import { getType } from "typesafe-actions";

function* addTodoSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoActions.addTodo), addTodo);
}

function* addTodo(action: ReturnType<typeof todoActions.addTodoSuccess>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(
      api.postTodo,
      action.payload.model,
      action.payload.id
    );
    yield put(
      todoActions.addTodoSuccess({ model: data, id: action.payload.id })
    );
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default addTodoSaga;
