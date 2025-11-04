import { useEffect, useState, useMemo } from 'react';
import CharacterCard from './components/CharacterCard';
import Pagination from './components/Pagination';
import SearchFilter from './components/SearchFilter';
import CharacterModal from './components/CharacterModal';
import LoginForm from './components/LoginForm';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './Hooks/useAuth';
import { fetchCharacters } from './services/swapi';

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  const [rawCharacters, setRawCharacters] = useState([]); // From API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ species: '', homeworld: '', film: '' });

  // Fetch from API (only search works on server)
  const load = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const finalUrl = url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
      const data = await fetchCharacters(finalUrl);
      setRawCharacters(data.results);
      setPagination({ next: data.next, prev: data.previous });
    } catch {
      setError('Failed to load characters.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      load('https://swapi.dev/api/people/');
    }
  }, [search, isAuthenticated]);

  // CLIENT-SIDE FILTERING
  const filteredCharacters = useMemo(() => {
    return rawCharacters.filter((char) => {
      // Species filter
      if (filters.species) {
        const speciesId = char.species[0]?.split('/').slice(-2, -1)[0];
        if (speciesId !== filters.species) return false;
      }

      // Homeworld filter
      if (filters.homeworld) {
        const planetId = char.homeworld?.split('/').slice(-2, -1)[0];
        if (planetId !== filters.homeworld) return false;
      }

      // Film filter
      if (filters.film) {
        const hasFilm = char.films.some((f) => f.includes(`/films/${filters.film}/`));
        if (!hasFilm) return false;
      }

      return true;
    });
  }, [rawCharacters, filters]);

  const handleLogin = (u, p) => {
    if (u === 'admin' && p === 'Password123!') {
      login();
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  if (!isAuthenticated) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 max-w-7xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">Star Wars Characters</h1>
          <button
            onClick={logout}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
          >
            Logout
          </button>
        </header>

        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {loading && <LoadingSpinner />}

        {error && <p className="text-center text-red-600 font-medium py-8">{error}</p>}

        {!loading && !error && filteredCharacters.length === 0 && (
          <p className="text-center text-gray-500 text-lg py-16">No characters match your filters.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((c) => (
            <CharacterCard key={c.url} character={c} onClick={() => setSelected(c)} />
          ))}
        </div>

        <Pagination next={pagination.next} prev={pagination.prev} onPageChange={load} />

        {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}

export default App;