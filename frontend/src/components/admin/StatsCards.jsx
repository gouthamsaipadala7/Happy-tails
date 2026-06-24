import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faUsers, faClipboardList, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const StatsCards = ({ stats }) => {
  const cards = [
    { label: "Total Pets", value: stats.totalPets, icon: faPaw, color: "bg-primary/10 text-primary" },
    { label: "Total Users", value: stats.totalUsers, icon: faUsers, color: "bg-accent/10 text-accent" },
    { label: "Total Requests", value: stats.totalRequests, icon: faClipboardList, color: "bg-secondary/20 text-yellow-700" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: faHourglassHalf, color: "bg-red-50 text-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl2 p-6 shadow-soft"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${c.color}`}>
            <FontAwesomeIcon icon={c.icon} />
          </div>
          <p className="text-2xl font-display font-bold">{c.value ?? 0}</p>
          <p className="text-sm text-gray-500">{c.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;