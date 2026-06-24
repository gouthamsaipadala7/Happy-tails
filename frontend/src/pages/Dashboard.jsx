import { useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "../components/dashboard/ProfileCard";
import FavoritesList from "../components/dashboard/FavoritesList";
import RequestTracker from "../components/dashboard/RequestTracker";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const tabs = [
  { key: "profile", label: "Profile" },
  { key: "favorites", label: "Favorites" },
  { key: "requests", label: "Adoption Requests" },
  { key: "activity", label: "Activity" },
];

const Dashboard = () => {
  const [tab, setTab] = useState("profile");

  return (
    <div className="section-padding">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-8">
        My Dashboard
      </motion.h1>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap ${
              tab === t.key ? "bg-primary text-white" : "bg-white shadow-soft text-dark"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {tab === "profile" && <ProfileCard />}
        {tab === "favorites" && <FavoritesList />}
        {tab === "requests" && <RequestTracker />}
        {tab === "activity" && <ActivityFeed />}
      </div>
    </div>
  );
};

export default Dashboard;