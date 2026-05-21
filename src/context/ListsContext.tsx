import React, { createContext, useContext, useState, useEffect } from 'react';
import type { List } from '../types/List';

type ListsContextType = {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
};

const ListsContext = createContext<ListsContextType | null>(null);

export function ListsProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<List[]>(() => {
    const stored = localStorage.getItem('lists');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  if (!context) {
    throw new Error('useLists must be used inside ListsProvider');
  }

  return context;
}
