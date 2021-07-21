import { takeLatest, call, put, StrictEffect } from "redux-saga/effects";
import * as api from "../../utils/Api";
import * as todoActions from "../actions/group";
import { spinnerStart, spinnerStop } from "../actions/group";
import { getError } from "../../components/errorHandler/actions";
import { getType } from "typesafe-actions";

function* putGroupColorSaga(): Generator<StrictEffect> {
  yield takeLatest(getType(todoActions.putGroupColor), putGroupColor);
}
function* putGroupColor(action: ReturnType<typeof todoActions.putGroupColor>) {
  yield put(spinnerStart());
  try {
    const { data } = yield call(
      api.putGroupColor,
      action.payload.groupId,
      action.payload.color
    );
    yield put(
      todoActions.putGroupColorSuccess({
        color: data.color,
        groupId: data.id,
      })
    );
  } catch (err) {
    yield put(getError(err.message));
  } finally {
    yield put(spinnerStop());
  }
}
export default putGroupColorSaga;
