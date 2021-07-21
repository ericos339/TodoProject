import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";

import * as api from "../../utils/Api";
import * as todoGroupActions from "../actions/group";
import { getError } from "../../components/errorHandler/actions";

import { spinnerStart, spinnerStop } from "../actions/group";
import { getType } from "typesafe-actions";

function* addGroupSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoGroupActions.addGroup), addGroup);
}
function* addGroup(
  action: ReturnType<typeof todoGroupActions.addGroupSuccess>
) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(api.postGroups, action.payload);
    yield put(todoGroupActions.addGroupSuccess(data));
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default addGroupSaga;
