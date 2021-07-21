import { all } from "redux-saga/effects";
import loadGroupsSaga from "./loadGroupsSaga";
import addGroupSaga from "./addGroupSaga";
import removeGroupSaga from "./removeGroupSaga";
import addTodoSaga from "./addTodoSaga";
import removeTodoSaga from "./removeTodoSaga";
import loadTodosSaga from "./loadTodosSaga";
import completeTodoSaga from "./completeTodoSaga";
import putGroupColorSaga from "./putGroupColor";

export default function* rootSaga() {
  yield all([
    loadGroupsSaga(),
    addGroupSaga(),
    removeGroupSaga(),
    addTodoSaga(),
    removeTodoSaga(),
    loadTodosSaga(),
    completeTodoSaga(),
    putGroupColorSaga(),
  ]);
}
