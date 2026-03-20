import TodoItem from "./TodoItem";

function TodoList({ items, onDelete, onToggleStatus, onEditText }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.length === 0 && <p style={{ color: '#666', textAlign: 'center' }}>Список порожній...</p>}
      {items.map((todo) => (
        <TodoItem 
          key={todo.id} 
          task={todo} 
          onDelete={onDelete} 
          onToggleStatus={onToggleStatus}
          onEditText={onEditText}
        />
      ))}
    </div>
  );
}

export default TodoList;