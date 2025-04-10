import './App.css';
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import SearchPage from './pages/Search';
import { createIDBPersister } from './helper/persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    },
  },
});

const persister = createIDBPersister('react-query');

function App() {
  return (
      <div className="App">
        <SearchPage/>
      </div>
  );
}

export default App;
