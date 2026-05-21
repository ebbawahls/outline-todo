import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createTodo } from '../api/todosApi';
import { useLists } from '../context/ListsContext';
import { TodoCard } from '../components/TodoCard';

export function SingleListPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { lists, setLists } = useLists();
  const list = lists.find((l) => l.id === id);

  const [text, setText] = useState('');

  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (list) setNewTitle(list.title);
  }, [list]);

  if (!list) return <p>List not found</p>;

  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      const createdTodo = await createTodo(text);

      setLists((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                todos: [...l.todos, createdTodo],
              }
            : l,
        ),
      );

      setText('');
    } catch (error) {
      console.error('Failed to create todo', error);
    }
  };

  const handleDelete = (todoId: number) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              todos: l.todos.filter((t) => t.id !== todoId),
            }
          : l,
      ),
    );
  };

  const handleToggle = (todoId: number) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              todos: l.todos.map((t) =>
                t.id === todoId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : l,
      ),
    );
  };

  const handleUpdateTodo = (todoId: number, newText: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              todos: l.todos.map((t) =>
                t.id === todoId ? { ...t, todo: newText } : t,
              ),
            }
          : l,
      ),
    );
  };

  const handleUpdateTitle = () => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              title: newTitle,
            }
          : l,
      ),
    );

    setEditingTitle(false);
  };

  const handleDeleteList = () => {
    setLists((prev) => prev.filter((l) => l.id !== id));

    navigate('/lists');
  };

  return (
    <div className="singleListPage">
      {list.coverImage && <img src={list.coverImage} alt="cover" />}
      {editingTitle ? (
        <div className="listHeader">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <button className="primaryBtn" onClick={handleUpdateTitle}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <h1>{list.title}</h1>

          <button className="primaryBtn" onClick={() => setEditingTitle(true)}>
            Edit
          </button>
        </div>
      )}

      <div className="todoForm">
        <input
          type="text"
          placeholder="Add task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="primaryBtn" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todosContainer">
        {list.todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={() => handleToggle(todo.id)}
            onUpdate={handleUpdateTodo}
          />
        ))}

        <button className="primaryBtn" onClick={handleDeleteList}>
          Delete List
        </button>
      </div>
    </div>
  );
}
