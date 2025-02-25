import React, { useState } from 'react';
import { useTodos } from './TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { state, dispatch } = useTodos();
  // Keep track of selected IDs in local state
  const [selectedIds, setSelectedIds] = useState([]);

  // Delete single item
  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    // Also remove from selectedIds if present
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  // Toggle Edit Mode
  const handleToggleEdit = (id) => {
    dispatch({ type: 'TOGGLE_EDIT_MODE', payload: id });
  };

  // Save an Edited Todo
  const handleEditTodo = (id, newText) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, newText } });
  };

  // Clear all todos at once
  const handleDeleteAll = () => {
    dispatch({ type: 'CLEAR_TODOS' });
    setSelectedIds([]);
  };

  // Checkbox toggle for a single row
  const handleSelectChange = (id) => {
    if (selectedIds.includes(id)) {
      // Unselect
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // Select
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete only the selected rows
  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) {
      dispatch({ type: 'DELETE_SELECTED_TODOS', payload: selectedIds });
      setSelectedIds([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonRow}>
        <button
          onClick={handleDeleteSelected}
          style={styles.multiDeleteButton}
          disabled={selectedIds.length === 0}
        >
          Delete Selected
        </button>
        <button onClick={handleDeleteAll} style={styles.deleteAllButton}>
          Delete All
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Todo</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((todo) => {
            const isSelected = selectedIds.includes(todo.id);
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={isSelected}
                onDelete={handleDelete}
                onToggleEdit={handleToggleEdit}
                onEditTodo={handleEditTodo}
                onSelectChange={handleSelectChange}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  buttonRow: {
    marginBottom: '1rem',
  },
  multiDeleteButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
  },
  deleteAllButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
  },
  table: {
    margin: '0 auto',
    borderCollapse: 'collapse',
    width: '70%',
  },
  th: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    textAlign: 'left',
  },
};
