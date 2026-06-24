import { useEffect, useState } from "react";
import { getMyAdoptionRequests } from "../../services/adoptionService";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "Under Review": "bg-blue-100 text-blue-700",
  Approved: "bg-accent/15 text-accent",
  Rejected: "bg-red-100 text-red-600",
};

const RequestTracker = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAdoptionRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500 text-sm">Loading requests...</p>;
  if (!requests.length) return <p className="text-gray-500 text-sm">You haven't submitted any adoption requests yet.</p>;

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <div key={req._id} className="glass rounded-xl2 p-4 flex items-center gap-4 shadow-soft">
          <img
            src={req.pet?.images?.[0]}
            alt={req.pet?.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold">{req.pet?.name}</p>
            <p className="text-xs text-gray-500">{req.pet?.breed}</p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[req.status]}`}>
            {req.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RequestTracker;