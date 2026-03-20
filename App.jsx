import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css"; 

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const addTask = async () => {
    if (inputValue.trim() === "") return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputValue })
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find(t => t.id === id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error(err);
    }
  };

  const editTaskText = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h1 style={styles.logo}>Todo Fullstack</h1>

        <div style={styles.inputGroup}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Що потрібно зробити?"
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>Додати</button>
        </div>

        <div style={styles.listContainer}>
          <TodoList 
            items={tasks} 
            onDelete={deleteTask} 
            onToggleStatus={toggleTaskStatus}
            onEditText={editTaskText}
          />
        </div>

        <p style={styles.footer}>React Hooks + Express API</p>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    paddingTop: '50px', 
    paddingBottom: '50px',
    backgroundColor: '#1a1a1a', 
    color: '#fff',
    boxSizing: 'border-box'
  },
  card: { 
    width: '100%', 
    maxWidth: '400px', 
    padding: '25px 25px 30px 25px', 
    borderRadius: '16px', 
    backgroundColor: '#242424', 
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
    display: 'flex', 
    flexDirection: 'column'
  },
  logo: { 
    fontSize: '2.5rem', 
    fontWeight: '900', 
    margin: '0 auto 25px auto', 
    textAlign: 'center', 
    display: 'block',
    width: '100%',
    background: 'linear-gradient(to right, #646cff, #9f64ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-1px',
    lineHeight: '1.3', 
    padding: '5px 0', 
    whiteSpace: 'nowrap'
  },
  inputGroup: { marginBottom: '25px', display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '14px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#333', color: '#fff', fontSize: '1rem' },
  addButton: { padding: '14px 22px', backgroundColor: '#646cff', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  listContainer: { flex: 1 },
  footer: { textAlign: 'center', marginTop: '30px', color: '#666', fontSize: '0.85rem' }
};

export default App;