import { useState, useEffect } from 'react';
import { fetchHomeworld } from '../services/swapi';
import { formatDate } from '../utils/formatDate';

function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHomeworld(character.homeworld);
        setHomeworld(data);
      } catch {
        setHomeworld({ name: 'Unknown', terrain: 'N/A', climate: 'N/A', population: 'N/A' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [character.homeworld]);

  const height = character.height !== 'unknown' ? `${(character.height / 100).toFixed(2)} m` : 'Unknown';
  const mass = character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all scale-100 hover:scale-[1.01]">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-indigo-800">{character.name}</h2>
              <p className="text-sm text-indigo-600 mt-1">Birth Year: {character.birth_year}</p>
            </div>
            <button
              onClick={onClose}
              className="text-3xl text-gray-500 hover:text-gray-700 transition"
            >
              ×
            </button>
          </div>

          {/* Image */}
          <div className="mb-6 -mt-12 -mx-8">
            <img
              src={`https://picsum.photos/seed/${character.name}/600/300`}
              alt={character.name}
              className="w-full h-48 object-cover rounded-t-2xl shadow-lg"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-2xl font-bold text-indigo-700">{height}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Mass</p>
              <p className="text-2xl font-bold text-indigo-700">{mass}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Films</p>
              <p className="text-2xl font-bold text-indigo-700">{character.films.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Added</p>
              <p className="text-lg font-semibold text-indigo-700">{formatDate(character.created)}</p>
            </div>
          </div>

          {/* Homeworld */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">Homeworld</h3>
            {loading ? (
              <p className="text-gray-500 animate-pulse">Loading planet...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>{' '}
                  <span className="text-indigo-700">{homeworld.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Population:</span>{' '}
                  <span className="text-indigo-700">{homeworld.population}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Terrain:</span>{' '}
                  <span className="text-indigo-700">{homeworld.terrain}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Climate:</span>{' '}
                  <span className="text-indigo-700">{homeworld.climate}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;