import React from 'react';
import { TaskItem } from '../types';

interface Props {
  tasks: TaskItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) return <div>No tasks yet.</div>;

  return (
    <ul style={{listStyle:'none',padding:0,display:'grid',gap:8}}>
      {tasks.map(t => (
        <li key={t.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:8,background:'#fff',borderRadius:6,boxShadow:'0 1px 2px rgba(0,0,0,0.04)'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <input type="checkbox" checked={t.isCompleted} onChange={() => onToggle(t.id)} />
            <span style={{textDecoration: t.isCompleted ? 'line-through' : 'none'}}>{t.description}</span>
          </div>
          <div>
            <button onClick={() => onDelete(t.id)} style={{padding:'6px 10px'}}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
