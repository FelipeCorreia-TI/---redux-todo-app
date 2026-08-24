import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*
  THUNK:
  fetchTodos simula a busca de tarefas em uma API externa.
  O setTimeout dentro da Promise cria um atraso de 1,5s para demonstrar o carregamento.
*/
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const dadosFalsos = [
    { id: 1001, title: 'Estudar Redux Toolkit', status: 'pendente' },
    { id: 1002, title: 'Praticar thunks', status: 'concluida' },
    { id: 1003, title: 'Entender sagas', status: 'pendente' },
  ];

  const resposta = await new Promise((resolve) => {
    setTimeout(() => resolve(dadosFalsos), 1500);
  });

  return resposta; // Vira o "action.payload" no fulfilled
});

/*
  SLICE:
  Estado inicial + reducers síncronos
*/
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],      // Array de tarefas
    loading: false, // Controla o status de carregamento
    error: null,    // Guarda mensagem de erro
  },
  reducers: {
    // ACTION 1: adicionar tarefa
    addTodo: (state, action) => {
      state.list.push({
        id: Date.now(),
        title: action.payload,
        status: 'pendente',
      });
    },
    // ACTION 2: remover tarefa pelo ID
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    // ACTION 3: alternar status
    toggleTodo: (state, action) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'pendente' ? 'concluida' : 'pendente';
      }
    },
  },
  /* extraReducers: reage às fases automáticas do thunk */
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;