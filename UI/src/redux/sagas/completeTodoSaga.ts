import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";
import * as api from "../../utils/Api";
import * as todoActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import { getError } from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

function* completeTodoSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoActions.completeTodo), completeTodo);
}
function* completeTodo(action: ReturnType<typeof todoActions.completeTodo>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(api.completeTodo, action.payload);
    yield put(todoActions.completeTodoSuccess(data.id));
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default completeTodoSaga;
