import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ListsProvider } from './context/ListsContext';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ListsProvider>
        <App />
      </ListsProvider>
    </BrowserRouter>
  </StrictMode>,
);
