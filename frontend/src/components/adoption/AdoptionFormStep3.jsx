const AdoptionFormStep3 = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold mb-4">Housing Information</h3>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Housing Type</label>
        <select
          {...register("housingInfo.housingType", { required: "Housing type is required" })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="">Select...</option>
          <option value="Own">Own</option>
          <option value="Rent">Rent</option>
        </select>
        {errors?.housingInfo?.housingType && <p className="text-red-500 text-xs mt-1">{errors.housingInfo.housingType.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("housingInfo.hasYard")} className="w-5 h-5 accent-primary" />
        <label className="text-sm text-gray-700">I have a yard or outdoor space</label>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("housingInfo.landlordApproval")} className="w-5 h-5 accent-primary" />
        <label className="text-sm text-gray-700">My landlord approves pets (if renting)</label>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Number of Occupants in Home</label>
        <input
          type="number"
          min="1"
          {...register("housingInfo.numberOfOccupants", { required: "Required", min: 1 })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </div>
  );
};

export default AdoptionFormStep3;