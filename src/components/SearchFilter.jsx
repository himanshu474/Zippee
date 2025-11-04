import { useState, useEffect } from 'react';
import useDebounce from '../Hooks/useDebounce';

const SPECIES = { Human: '1', Droid: '2', Wookiee: '3' };
const PLANETS = { Tatooine: '1', Alderaan: '2', Coruscant: '4' };
const FILMS = {
  'A New Hope': '1',
  'Empire Strikes Back': '2',
  'Return of the Jedi': '3',
};

function SearchFilter({ search, onSearchChange, filters, onFiltersChange }) {
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  useEffect(() => {
    if (search !== debouncedSearch) setLocalSearch(search);
  }, [search, debouncedSearch]);

  const setFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value || '' });
  };

  return (
    <div className="mb-8 space-y-5 bg-white p-6 rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Search by name..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full p-3 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          value={filters.species}
          onChange={(e) => setFilter('species', e.target.value)}
          className="p-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All Species</option>
          {Object.entries(SPECIES).map(([name, id]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <select
          value={filters.homeworld}
          onChange={(e) => setFilter('homeworld', e.target.value)}
          className="p-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All Planets</option>
          {Object.entries(PLANETS).map(([name, id]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        <select
          value={filters.film}
          onChange={(e) => setFilter('film', e.target.value)}
          className="p-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All Films</option>
          {Object.entries(FILMS).map(([name, id]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;