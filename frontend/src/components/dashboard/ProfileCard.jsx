import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import * as userService from "../../services/userService";

const ProfileCard = () => {
  const { user, updateUserInStorage } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", address: user?.address || "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateProfile(form);
      updateUserInStorage(updated);
      setMessage("Profile updated successfully");
      setEditing(false);
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl2 p-6 shadow-soft">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
          {user?.name?.[0]}
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {message && <p className="text-sm text-accent mb-4">{message}</p>}

      {editing ? (
        <div className="space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full px-4 py-2.5 rounded-full border border-gray-200"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="w-full px-4 py-2.5 rounded-full border border-gray-200"
          />
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
            className="w-full px-4 py-2.5 rounded-full border border-gray-200"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="btn-primary !px-5 !py-2 text-sm">
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditing(false)} className="btn-outline !px-5 !py-2 text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {user?.phone || "Not set"}</p>
          <p className="text-sm text-gray-600 mb-4"><strong>Address:</strong> {user?.address || "Not set"}</p>
          <button onClick={() => setEditing(true)} className="btn-outline !px-5 !py-2 text-sm">
            Edit Profile
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileCard;