import { takeEvery, delay } from 'redux-saga/effects';
import { addTodo } from './todosSlice';

/* Worker: o que fazer quando addTodo acontecer */
function* logAddTodo(action) {
  console.log(
    `%c [SAGA] Tarefa adicionada com sucesso: "${action.payload}"`,
    'color: green; font-weight: bold;'
  );
  yield delay(500); // Pausa de 0,5s
  console.log('[SAGA] Log finalizado.');
}

/* Watcher: escuta a ação addTodo */
export function* watchAddTodo() {
  yield takeEvery(addTodo.type, logAddTodo);
}