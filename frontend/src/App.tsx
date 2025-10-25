import React, { useEffect, useState } from 'react';
import { TaskItem } from './types';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_KEY = 'taskmanager.tasks.v1';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TaskItem[];
        setTasks(parsed);
      } catch {}
    }
    fetchTasks()
      .then(server => {
        if (server && server.length > 0) {
          setTasks(server);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(server));
        }
      })
      .catch(() => {});
  }, []);

  const persist = (next: TaskItem[]) => {
    setTasks(next);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  };

  const visible = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.isCompleted : t.isCompleted
  );

  const handleAdd = async () => {
    if (!newDesc.trim()) return;
    const temp: TaskItem = {
      id: crypto.randomUUID(),
      description: newDesc.trim(),
      isCompleted: false,
    };
    persist([temp, ...tasks]);
    setNewDesc('');
    try {
      const created = await createTask({
        description: temp.description,
        isCompleted: temp.isCompleted,
      });
      const next = [created, ...tasks];
      persist(next);
    } catch (e) {
      console.error('Create failed', e);
    }
  };

  const handleToggle = async (id: string) => {
    const next = tasks.map(t =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    persist(next);
    const target = next.find(t => t.id === id);
    if (!target) return;
    try {
      await updateTask(id, {
        description: target.description,
        isCompleted: target.isCompleted,
      });
    } catch (e) {
      console.error('Update failed', e);
    }
  };

  const handleDelete = async (id: string) => {
    const next = tasks.filter(t => t.id !== id);
    persist(next);
    try {
      await deleteTask(id);
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📝 Basic Task Manager</h1>

      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task..."
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Task
        </button>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <div className="btn-group" role="group" aria-label="filter">
          <button
            type="button"
            className={filter === 'all' ? 'btn btn-secondary' : 'btn btn-outline-secondary'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'active' ? 'btn btn-secondary' : 'btn btn-outline-secondary'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'btn btn-secondary' : 'btn btn-outline-secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-3">
          {visible.length > 0 ? (
            <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
          ) : tasks.length === 0 ? (
            <p className="text-muted text-center mb-0">No tasks yet. Add one above!</p>
          ) : (
            <p className="text-muted text-center mb-0">No tasks match the selected filter.</p>
          )}
        </div>
      </div>
      <footer className="text-center text-muted mt-3">
        <small>Task manager of Appsian Tech made by Angel Sharma</small>
      </footer>
    </div>
  );
}

export default App;
