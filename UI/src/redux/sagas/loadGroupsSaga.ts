import { takeLatest, put, call, StrictEffect } from "redux-saga/effects";

import * as api from "../../utils/Api";
import * as todoGroupActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import * as errorActions from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

export function* loadGroupsSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoGroupActions.loadGroups), loadGroups);
}

function* loadGroups() {
  yield put(spinnerStart());
  try {
    const { data } = yield call(api.getGroups);
    yield put(todoGroupActions.loadGroupsSuccess(data));
  } catch (err) {
    yield put(errorActions.getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}

export default loadGroupsSaga;
