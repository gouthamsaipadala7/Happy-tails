import PetCard from "./PetCard";
import SkeletonLoader from "../common/SkeletonLoader";

const PetGrid = ({ pets, loading }) => {
  if (loading) return <SkeletonLoader count={6} />;

  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🐾</p>
        <p className="text-gray-500 font-medium">No pets found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
};

export default PetGrid;