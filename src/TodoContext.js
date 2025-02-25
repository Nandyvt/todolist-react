import React, { createContext, useReducer, useContext, useEffect } from 'react';

/* 1) Create the Context */
export const TodoContext = createContext();

/* 2) Load from localStorage, or fall back to an empty array */
function loadTodosFromLocalStorage() {
  try {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error parsing todos from localStorage:', error);
  }
  return [];
}

const initialState = {
  todos: loadTodosFromLocalStorage()
};

/* 3) Reducer function */
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, isEditing: false }
        ],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.newText, isEditing: false }
            : todo
        ),
      };
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isEditing: !todo.isEditing }
            : todo
        ),
      };
    case 'CLEAR_TODOS':
      // Clears all todos at once
      return {
        ...state,
        todos: []
      };
    case 'DELETE_SELECTED_TODOS':
      // action.payload = array of IDs
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id))
      };
    default:
      return state;
  }
}

/* 4) Create a Context Provider to wrap the app */
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 5) Whenever 'state.todos' changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

/* 6) Create a custom hook for Todos */
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
