import React, { useState } from 'react';
import { useTodos } from './TodoContext';

export default function AddTodo() {
  const [inputValue, setInputValue] = useState('');
  const { dispatch } = useTodos();

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    dispatch({ type: 'ADD_TODO', payload: inputValue });
    setInputValue('');
  };

  return (
    <div style={styles.addTodoContainer}>
      <input
        type="text"
        placeholder="Enter a todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddTodo} style={styles.addButton}>
        Add Todo
      </button>
    </div>
  );
}

const styles = {
  addTodoContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  addButton: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
