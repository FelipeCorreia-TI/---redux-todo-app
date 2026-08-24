import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from '../features/todos/todosSlice';
import rootSaga from './rootSaga';

// 1) Cria o middleware do Redux-Saga
const sagaMiddleware = createSagaMiddleware();

// 2) Monta a store (getDefaultMiddleware já inclui o redux-thunk)
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// 3) Executa a Saga (SEMPRE depois de criar a store)
sagaMiddleware.run(rootSaga);

export default store;