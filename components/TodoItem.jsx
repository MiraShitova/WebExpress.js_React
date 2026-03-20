import { useState } from "react";

function TodoItem({ task, onDelete, onToggleStatus, onEditText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEditText(task.id, editText);
    setIsEditing(false);
  };

  return (
    <div style={styles.item}>
      <div style={styles.leftGroup}>
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggleStatus(task.id)} 
          style={styles.checkbox}
          disabled={isEditing}
        />
        
        {isEditing ? (
          <input 
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={styles.editInput}
            autoFocus
          />
        ) : (
          <span style={{ 
            ...styles.taskText,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#666' : '#fff'
          }}>
            {task.text}
          </span>
        )}
      </div>
      
      <div style={styles.rightGroup}>
        {isEditing ? (
          <button onClick={handleSave} style={styles.saveBtn}>💾</button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={styles.editBtn}>✏️</button>
        )}
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn} disabled={isEditing}>🗑️</button>
      </div>
    </div>
  );
}

const styles = {
  item: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#2a2a2a', borderRadius: '10px', gap: '10px', marginBottom: '10px' },
  leftGroup: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
  rightGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  checkbox: { cursor: 'pointer', width: '18px', height: '18px', transform: 'scale(1.2)', margin: 0 },
  taskText: { fontSize: '1rem', textAlign: 'left', flex: 1 },
  editInput: { flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #646cff', backgroundColor: '#333', color: '#fff', fontSize: '1rem', outline: 'none', textAlign: 'left' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px' },
  editBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px', color: '#ffc107' },
  saveBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px', color: '#28a745' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px', color: '#ff4d4d' }
};

export default TodoItem;