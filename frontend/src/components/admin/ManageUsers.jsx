import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import * as userService from "../../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    userService.getAllUsers().then(setUsers).finally(() => setLoading(false));
  };

  useEffect(() => { loadUsers(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await userService.deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-6">Manage Users</h2>
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <div className="bg-white rounded-xl2 shadow-soft overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-gray-50 hover:bg-background/50">
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    {u.role !== "admin" && (
                      <button onClick={() => handleDelete(u._id)} className="text-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;