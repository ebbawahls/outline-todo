import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SingleListPage } from './pages/SingleListPage';
import { ListsPage } from './pages/ListsPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/lists/:id" element={<SingleListPage />} />
      </Routes>
    </>
  );
}

export default App;
