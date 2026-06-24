import { useFavoritesContext } from "../../context/FavoritesContext";

const ActivityFeed = () => {
  const { favorites } = useFavoritesContext();

  const items = [
    ...favorites.slice(0, 5).map((f) => ({
      text: `You favorited ${f.pet?.name}`,
      date: f.createdAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!items.length) return <p className="text-gray-500 text-sm">No recent activity yet.</p>;

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-600 flex justify-between border-b border-gray-100 pb-2">
          <span>🐾 {item.text}</span>
          <span className="text-gray-400 text-xs">{new Date(item.date).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;