import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { List } from '../types/List';
import { useLists } from '../context/ListsContext';
import { uploadImage } from '../api/cloudinaryApi';

export function ListsPage() {
  const { lists, setLists } = useLists();
  const [title, setTitle] = useState('');

  const [coverImage, setCoverImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const addList = () => {
    if (!title.trim()) return;

    const newList: List = {
      id: crypto.randomUUID(),
      title,
      todos: [],
      coverImage: coverImage || undefined,
    };

    setLists((prev) => [newList, ...prev]);
    setTitle('');
    setCoverImage(null);
  };

  const handleDeleteList = (id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="listsPage">
      <h1>All the lists</h1>

      <div className="createList">
        <input
          type="text"
          placeholder="Create a new list..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);

            try {
              const uploadedUrl = await uploadImage(file);
              setCoverImage(uploadedUrl);
            } catch (error) {
              console.error('Upload failed', error);
            } finally {
              setUploading(false);
            }
          }}
        />

        <button className="primaryBtn" onClick={addList} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Create'}
        </button>
      </div>
      <div className="listsGrid">
        {lists.length === 0 ? (
          <p>No lists yet</p>
        ) : (
          lists.map((list) => (
            <div
              className="listCard"
              key={list.id}
              onClick={() => navigate(`/lists/${list.id}`)}
            >
              {list.coverImage && <img src={list.coverImage} alt="cover" />}
              <h2>{list.title}</h2>
              <p>{list.todos.length} tasks</p>
              <button
                className="primaryBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteList(list.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
