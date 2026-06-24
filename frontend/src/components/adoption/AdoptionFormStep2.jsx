const AdoptionFormStep2 = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold mb-4">Address Information</h3>
      <div>
        <input
          placeholder="Street Address"
          {...register("addressInfo.street", { required: "Street address is required" })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {errors?.addressInfo?.street && <p className="text-red-500 text-xs mt-1">{errors.addressInfo.street.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            placeholder="City"
            {...register("addressInfo.city", { required: "City is required" })}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors?.addressInfo?.city && <p className="text-red-500 text-xs mt-1">{errors.addressInfo.city.message}</p>}
        </div>
        <div>
          <input
            placeholder="State"
            {...register("addressInfo.state", { required: "State is required" })}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors?.addressInfo?.state && <p className="text-red-500 text-xs mt-1">{errors.addressInfo.state.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            placeholder="ZIP Code"
            {...register("addressInfo.zipCode", { required: "ZIP code is required" })}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors?.addressInfo?.zipCode && <p className="text-red-500 text-xs mt-1">{errors.addressInfo.zipCode.message}</p>}
        </div>
        <div>
          <input
            placeholder="Country"
            defaultValue="India"
            {...register("addressInfo.country")}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
    </div>
  );
};

export default AdoptionFormStep2;