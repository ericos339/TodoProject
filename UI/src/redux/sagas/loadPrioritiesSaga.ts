import { takeLatest, put, call, StrictEffect } from "redux-saga/effects";

import * as api from "../../utils/Api";
import * as todoGroupActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import * as errorActions from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

export function* loadPrioritiesSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoGroupActions.loadPriorities), loadPriorities);
}

function* loadPriorities() {
  yield put(spinnerStart());
  try {
    const { data } = yield call(api.getPriorities);
    yield put(todoGroupActions.loadPrioritiesSuccess(data));
  } catch (err) {
    yield put(errorActions.getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}

export default loadPrioritiesSaga;