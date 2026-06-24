const AdoptionFormStep1 = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold mb-4">Personal Information</h3>
      <div>
        <input
          placeholder="Full Name"
          {...register("personalInfo.fullName", { required: "Full name is required" })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {errors?.personalInfo?.fullName && <p className="text-red-500 text-xs mt-1">{errors.personalInfo.fullName.message}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          {...register("personalInfo.email", { required: "Email is required" })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {errors?.personalInfo?.email && <p className="text-red-500 text-xs mt-1">{errors.personalInfo.email.message}</p>}
      </div>
      <div>
        <input
          placeholder="Phone Number"
          {...register("personalInfo.phone", { required: "Phone is required" })}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {errors?.personalInfo?.phone && <p className="text-red-500 text-xs mt-1">{errors.personalInfo.phone.message}</p>}
      </div>
      <div>
        <input
          placeholder="Occupation (optional)"
          {...register("personalInfo.occupation")}
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </div>
  );
};

export default AdoptionFormStep1;