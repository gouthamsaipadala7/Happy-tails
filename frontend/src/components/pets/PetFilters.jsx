const PetFilters = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="glass rounded-xl2 p-5 flex flex-wrap gap-4 items-center shadow-soft mb-8">
      <input
        type="text"
        placeholder="Search by name or breed..."
        value={filters.search || ""}
        onChange={(e) => handleChange("search", e.target.value)}
        className="flex-1 min-w-[200px] px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />

      <select
        value={filters.species || ""}
        onChange={(e) => handleChange("species", e.target.value)}
        className="px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="">All Species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Bird">Bird</option>
      </select>

      <select
        value={filters.gender || ""}
        onChange={(e) => handleChange("gender", e.target.value)}
        className="px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="">Any Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={filters.status || ""}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="">Any Status</option>
        <option value="Available">Available</option>
        <option value="Pending">Pending</option>
        <option value="Adopted">Adopted</option>
      </select>

      <button
        onClick={() => setFilters({})}
        className="text-sm font-medium text-primary hover:underline"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default PetFilters;
