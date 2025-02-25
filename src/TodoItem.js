import React, { useState } from 'react';

/*
  Props:
    todo: { id, text, isEditing }
    onDelete: (id) => void
    onToggleEdit: (id) => void
    onEditTodo: (id, newText) => void
    isSelected: boolean (whether the checkbox is checked)
    onSelectChange: (id) => void (toggles the checkbox)
*/
export default function TodoItem({
  todo,
  onDelete,
  onToggleEdit,
  onEditTodo,
  isSelected,
  onSelectChange,
}) {
  const [editValue, setEditValue] = useState(todo.text);

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      onEditTodo(todo.id, editValue);
    } else {
      // If user clears text, revert to old text or handle differently
      setEditValue(todo.text);
    }
  };

  return (
    <tr style={styles.tr}>
      {/* 1) Checkbox column */}
      <td style={styles.tdCheckbox}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectChange(todo.id)}
        />
      </td>

      {/* 2) ID column */}
      <td style={styles.td}>{todo.id}</td>

      {/* 3) Todo text or edit field */}
      <td style={styles.td}>
        {todo.isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={styles.input}
          />
        ) : (
          todo.text
        )}
      </td>

      {/* 4) Actions column: Edit/Save/Cancel/Delete */}
      <td style={styles.td}>
        {todo.isEditing ? (
          <>
            <button onClick={saveEdit} style={styles.saveButton}>Save</button>
            <button onClick={() => onToggleEdit(todo.id)} style={styles.cancelButton}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleEdit(todo.id)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} style={styles.deleteButton}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

const styles = {
  tr: {
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '0.5rem',
    border: '1px solid #ccc',
  },
  tdCheckbox: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  input: {
    padding: '0.3rem',
    fontSize: '1rem',
  },
  saveButton: {
    marginRight: '0.5rem',
    padding: '0.3rem 0.6rem',
    cursor: 'pointer',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
  },
  editButton: {
    marginRight: '0.5rem',
    padding: '0.3rem 0.6rem',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: '0.5rem',
    padding: '0.3rem 0.6rem',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    padding: '0.3rem 0.6rem',
    cursor: 'pointer',
    border: 'none',
  },
};
