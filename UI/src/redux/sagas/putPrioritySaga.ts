import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";
import * as api from "../../utils/Api";
import * as todoActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import { getError } from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

function* changePrioritySaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoActions.changePriorityTodo), changePriority);
}
function* changePriority(action: ReturnType<typeof todoActions.changePriorityTodo>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(
      api.putPriority,
      action.payload.todoId,
      action.payload.priority
    );
    yield put(
      todoActions.changePriorityTodoSuccess({
        priority: data.priority,
        todoId: data.todoId
      })
    );
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default changePrioritySaga;
