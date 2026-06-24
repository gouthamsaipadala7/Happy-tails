import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as petService from "../../services/petService";

const emptyForm = {
  name: "", species: "Dog", breed: "", age: 1, gender: "Male", size: "Medium",
  description: "", images: [""], status: "Available", healthInfo: "",
  vaccinated: false, neutered: false, shelterName: "Happy Tails Shelter",
  shelterLocation: "", shelterContact: "",
};

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const loadPets = () => {
    setLoading(true);
    petService.getPets({ limit: 100 }).then((data) => setPets(data.pets)).finally(() => setLoading(false));
  };

  useEffect(() => { loadPets(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (pet) => {
    setForm({ ...pet, images: pet.images?.length ? pet.images : [""] });
    setEditingId(pet._id);
    setShowForm(true);
  };

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form, images: form.images.filter(Boolean) };
      if (editingId) {
        await petService.updatePet(editingId, payload);
      } else {
        await petService.createPet(payload);
      }
      setShowForm(false);
      loadPets();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save pet");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pet?")) return;
    await petService.deletePet(id);
    loadPets();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Manage Pets</h2>
        <button onClick={openCreate} className="btn-primary !px-5 !py-2.5 text-sm flex items-center gap-2">
          <FontAwesomeIcon icon={faPlus} /> Add Pet
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading pets...</p>
      ) : (
        <div className="bg-white rounded-xl2 shadow-soft overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="p-4">Pet</th>
                <th className="p-4">Species</th>
                <th className="p-4">Breed</th>
                <th className="p-4">Age</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet._id} className="border-b border-gray-50 hover:bg-background/50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={pet.images?.[0]} alt={pet.name} className="w-10 h-10 rounded-lg object-cover" />
                    {pet.name}
                  </td>
                  <td className="p-4">{pet.species}</td>
                  <td className="p-4">{pet.breed}</td>
                  <td className="p-4">{pet.age}</td>
                  <td className="p-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{pet.status}</span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => openEdit(pet)} className="text-primary"><FontAwesomeIcon icon={faPen} /></button>
                    <button onClick={() => handleDelete(pet._id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl2 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-xl font-display font-bold mb-4">{editingId ? "Edit Pet" : "Add New Pet"}</h3>
            {error && <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required className="w-full px-4 py-2.5 rounded-full border border-gray-200" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.species} onChange={(e) => handleChange("species", e.target.value)} className="px-4 py-2.5 rounded-full border border-gray-200">
                  {["Dog", "Cat", "Rabbit", "Bird"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input placeholder="Breed" value={form.breed} onChange={(e) => handleChange("breed", e.target.value)} required className="px-4 py-2.5 rounded-full border border-gray-200" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" placeholder="Age" value={form.age} onChange={(e) => handleChange("age", Number(e.target.value))} required className="px-4 py-2.5 rounded-full border border-gray-200" />
                <select value={form.gender} onChange={(e) => handleChange("gender", e.target.value)} className="px-4 py-2.5 rounded-full border border-gray-200">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className="px-4 py-2.5 rounded-full border border-gray-200">
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>
              <input
                placeholder="Image URL"
                value={form.images[0] || ""}
                onChange={(e) => handleChange("images", [e.target.value])}
                className="w-full px-4 py-2.5 rounded-full border border-gray-200"
              />
              <textarea placeholder="Description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} required rows={3} className="w-full px-4 py-2.5 rounded-xl2 border border-gray-200" />
              <input placeholder="Health Info" value={form.healthInfo} onChange={(e) => handleChange("healthInfo", e.target.value)} className="w-full px-4 py-2.5 rounded-full border border-gray-200" />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.vaccinated} onChange={(e) => handleChange("vaccinated", e.target.checked)} /> Vaccinated</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.neutered} onChange={(e) => handleChange("neutered", e.target.checked)} /> Neutered</label>
              </div>
              <button type="submit" className="btn-primary w-full">{editingId ? "Update Pet" : "Create Pet"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePets;