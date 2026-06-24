import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import StatsCards from "../components/admin/StatsCards";
import ManagePets from "../components/admin/ManagePets";
import ManageUsers from "../components/admin/ManageUsers";
import ManageRequests from "../components/admin/ManageRequests";
import * as userService from "../services/userService";

const Overview = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAdminStats().then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-6">Dashboard Overview</h1>
      {loading ? <p className="text-gray-500">Loading stats...</p> : <StatsCards stats={stats} />}

      <div className="bg-white rounded-xl2 shadow-soft p-6">
        <h3 className="font-semibold mb-4">Pets by Species</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(stats.speciesBreakdown || []).map((s) => (
            <div key={s._id} className="bg-background rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-primary">{s.count}</p>
              <p className="text-sm text-gray-500">{s._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="pets" element={<ManagePets />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="requests" element={<ManageRequests />} />
    </Routes>
  );
};

export default AdminDashboard;