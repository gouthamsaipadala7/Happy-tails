const AdoptionFormStep4 = ({ register }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold mb-4">Pet Experience</h3>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("petExperience.hasOtherPets")} className="w-5 h-5 accent-primary" />
        <label className="text-sm text-gray-700">I currently have other pets</label>
      </div>

      <div>
        <textarea
          placeholder="Tell us about your other pets (if any)"
          {...register("petExperience.otherPetsDetails")}
          rows={3}
          className="w-full px-5 py-3 rounded-xl2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Pet Ownership Experience</label>
        <select
          {...register("petExperience.experienceLevel")}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="First-time">First-time owner</option>
          <option value="Some experience">Some experience</option>
          <option value="Very experienced">Very experienced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Hours Pet Will Be Alone Daily</label>
        <input
          type="number"
          min="0"
          max="24"
          {...register("petExperience.hoursAloneDaily")}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <textarea
          placeholder="Any additional notes for the shelter?"
          rows={3}
          className="w-full px-5 py-3 rounded-xl2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </div>
  );
};

export default AdoptionFormStep4;