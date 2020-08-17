import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrar,
  borrarCompletados,
  crear,
  editar,
  toggle,
  toggleAll,
} from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Amar al mamorsh'),
  new Todo('Consentir a Kalvito'),
  new Todo('Trabajar :('),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),

  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),

  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),

  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  }),

  on(borrarCompletados, (state) =>
    state.filter((todo) => todo.completado === false)
  )
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
