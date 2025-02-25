import React from 'react';
import { TodoProvider } from './TodoContext';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export default function App() {
  return (
    <TodoProvider>
      <h2 style={styles.header}>React Todo List with Multi-Select Checkboxes</h2>
      <AddTodo />
      <TodoList />
    </TodoProvider>
  );
}

const styles = {
  header: {
    textAlign: 'center',
    marginTop: '1rem',
  },
};
