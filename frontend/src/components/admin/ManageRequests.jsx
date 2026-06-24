import { useState, useEffect } from "react";
import * as adoptionService from "../../services/adoptionService";

const statusOptions = ["Pending", "Under Review", "Approved", "Rejected"];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "Under Review": "bg-blue-100 text-blue-700",
  Approved: "bg-accent/15 text-accent",
  Rejected: "bg-red-100 text-red-600",
};

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const loadRequests = () => {
    setLoading(true);
    adoptionService.getAllAdoptionRequests(filter ? { status: filter } : {})
      .then(setRequests)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadRequests(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    await adoptionService.updateAdoptionStatus(id, { status });
    loadRequests();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Adoption Requests</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-full border border-gray-200 text-sm">
          <option value="">All Statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : !requests.length ? (
        <p className="text-gray-500">No adoption requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white rounded-xl2 shadow-soft p-5 flex flex-col md:flex-row md:items-center gap-4">
              <img src={req.pet?.images?.[0]} alt={req.pet?.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{req.pet?.name} <span className="text-gray-400 text-sm">({req.pet?.breed})</span></p>
                <p className="text-sm text-gray-600">{req.user?.name} • {req.user?.email}</p>
                <p className="text-xs text-gray-400">Submitted {new Date(req.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[req.status]}`}>{req.status}</span>
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req._id, e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm"
              >
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;