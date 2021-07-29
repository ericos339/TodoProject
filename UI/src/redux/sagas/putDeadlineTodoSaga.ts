import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";
import * as api from "../../utils/Api";
import * as todoActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import { getError } from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

function* putDeadlineTodoSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoActions.changeDeadlineTodo), changeDeadlineTodo);
}
function* changeDeadlineTodo(action: ReturnType<typeof todoActions.changeDeadlineTodo>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(
      api.putDeadlineTodo,
      action.payload.todoId,
      action.payload.deadline
    );
    yield put(
      todoActions.changeDeadlineTodoSuccess({
        deadline: data.deadline,
        todoId: data.todoId
      })
    );
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default putDeadlineTodoSaga;
