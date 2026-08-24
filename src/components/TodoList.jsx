import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  removeTodo,
  toggleTodo,
  fetchTodos,
} from '../features/todos/todosSlice';
import './TodoList.css';

export default function TodoList() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  // Lê o estado da store
  const { list, loading, error } = useSelector((s) => s.todos);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addTodo(input.trim()));
    setInput('');
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas com Redux</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="Digite uma nova tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>

      <button
        className="btn-load"
        onClick={() => dispatch(fetchTodos())}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Carregar Tarefas'}
      </button>

      {loading && <p className="loading">Carregando...</p>}
      {error && <p className="error">Erro: {error}</p>}

      {!loading && list.length === 0 && (
        <p className="vazio">Nenhuma tarefa cadastrada.</p>
      )}

      <ul className="lista">
        {list.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={todo.status === 'concluida' ? 'feito' : ''}
              title="Clique para alternar o status"
            >
              {todo.title} - <em>{todo.status}</em>
            </span>
            <button
              className="btn-remove"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <p className="total">Total de tarefas: {list.length}</p>
    </div>
  );
}