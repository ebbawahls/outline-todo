import { useState } from 'react';
import type { Todo } from '../types/List';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: () => void;
  onUpdate: (id: number, text: string) => void;
};

export function TodoCard({ todo, onDelete, onToggle, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.todo);

  return (
    <div className="todoCard">
      {editing ? (
        <div>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />

          <button
            className="primaryBtn"
            onClick={() => {
              onUpdate(todo.id, newText);
              setEditing(false);
            }}
          >
            Save
          </button>

          <button className="primaryBtn" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h3
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.todo}
          </h3>

          <p>{todo.completed ? 'Completed' : 'Active'}</p>

          <div className="actions">
            <button className="primaryBtn" onClick={onToggle}>
              {todo.completed ? 'Undo' : 'Done'}
            </button>

            <button className="primaryBtn" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
