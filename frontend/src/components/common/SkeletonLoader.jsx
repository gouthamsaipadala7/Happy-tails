const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl2 overflow-hidden shadow-soft bg-white animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;