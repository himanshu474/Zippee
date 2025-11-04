function CharacterCard({ character, onClick }) {
  const speciesId = character.species[0]?.split('/').slice(-2, -1)[0] || 0;
  const colors = [
    'bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100',
    'bg-purple-100', 'bg-pink-100', 'bg-indigo-100', 'bg-teal-100'
  ];
  const bgColor = colors[speciesId % colors.length] || 'bg-gray-100';

  return (
    <div
      onClick={onClick}
      className={`${bgColor} p-4 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200`}
    >
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(character.name)}/300/400`}
        alt={character.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      <h3 className="font-semibold text-lg text-center text-gray-800 truncate">
        {character.name}
      </h3>
    </div>
  );
}

export default CharacterCard;