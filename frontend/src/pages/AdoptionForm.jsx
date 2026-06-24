import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { getPetById } from "../services/petService";
import { submitAdoptionRequest } from "../services/adoptionService";
import AdoptionFormStep1 from "../components/adoption/AdoptionFormStep1";
import AdoptionFormStep2 from "../components/adoption/AdoptionFormStep2";
import AdoptionFormStep3 from "../components/adoption/AdoptionFormStep3";
import AdoptionFormStep4 from "../components/adoption/AdoptionFormStep4";
import AdoptionFormStep5 from "../components/adoption/AdoptionFormStep5";

const steps = ["Personal", "Address", "Housing", "Experience", "Review"];

const AdoptionForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, trigger, formState: { errors }, watch } = useForm({
    defaultValues: {
      personalInfo: {},
      addressInfo: { country: "India" },
      housingInfo: { numberOfOccupants: 1 },
      petExperience: { experienceLevel: "First-time", hoursAloneDaily: 0 },
    },
  });

  useEffect(() => {
    getPetById(petId).then((data) => setPet(data.pet));
  }, [petId]);

  const stepFields = [
    ["personalInfo.fullName", "personalInfo.email", "personalInfo.phone"],
    ["addressInfo.street", "addressInfo.city", "addressInfo.state", "addressInfo.zipCode"],
    ["housingInfo.housingType"],
    [],
    [],
  ];

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError("");
    try {
      await submitAdoptionRequest({ ...data, pet: petId });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (!pet) return <div className="section-padding text-center text-gray-500">Loading...</div>;

  return (
    <div className="section-padding max-w-2xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Adopt {pet.name}</h1>
      <p className="text-gray-600 mb-8">Complete the form below to start the adoption process.</p>

      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center relative">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm z-10 ${
                i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span className="text-xs mt-1 text-gray-500 hidden sm:block">{s}</span>
            {i < steps.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < step ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {error && <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-xl3 p-8 shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && <AdoptionFormStep1 register={register} errors={errors} />}
            {step === 1 && <AdoptionFormStep2 register={register} errors={errors} />}
            {step === 2 && <AdoptionFormStep3 register={register} errors={errors} />}
            {step === 3 && <AdoptionFormStep4 register={register} />}
            {step === 4 && <AdoptionFormStep5 formData={watch()} pet={pet} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn-outline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdoptionForm;