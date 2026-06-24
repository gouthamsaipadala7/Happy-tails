const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-dark text-right">{value || "—"}</span>
  </div>
);

const AdoptionFormStep5 = ({ formData, pet }) => {
  return (
    <div>
      <h3 className="text-xl font-display font-bold mb-4">Review &amp; Submit</h3>

      <div className="glass rounded-xl2 p-5 mb-4">
        <p className="font-semibold mb-2">Adopting: {pet?.name}</p>
        <Row label="Full Name" value={formData.personalInfo?.fullName} />
        <Row label="Email" value={formData.personalInfo?.email} />
        <Row label="Phone" value={formData.personalInfo?.phone} />
        <Row label="Address" value={`${formData.addressInfo?.street}, ${formData.addressInfo?.city}, ${formData.addressInfo?.state} ${formData.addressInfo?.zipCode}`} />
        <Row label="Housing Type" value={formData.housingInfo?.housingType} />
        <Row label="Has Yard" value={formData.housingInfo?.hasYard ? "Yes" : "No"} />
        <Row label="Experience Level" value={formData.petExperience?.experienceLevel} />
        <Row label="Has Other Pets" value={formData.petExperience?.hasOtherPets ? "Yes" : "No"} />
      </div>

      <p className="text-sm text-gray-500">
        By submitting, you confirm the information above is accurate. Our team will review your application and reach out via email.
      </p>
    </div>
  );
};

export default AdoptionFormStep5;