import { all } from 'redux-saga/effects';
import { watchAddTodo } from '../features/todos/todosSaga';

export default function* rootSaga() {
  yield all([
    watchAddTodo(),
    // Futuras sagas entram aqui
  ]);
}