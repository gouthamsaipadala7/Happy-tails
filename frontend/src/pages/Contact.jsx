import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  { q: "How long does the adoption process take?", a: "Typically 3-7 days from application submission to approval, depending on review volume." },
  { q: "Is there an adoption fee?", a: "Yes, fees vary by pet and cover vaccinations, microchipping, and basic veterinary care." },
  { q: "Can I visit a pet before adopting?", a: "Yes! Once your application is under review, our team will schedule a meet-and-greet." },
  { q: "What if the adoption doesn't work out?", a: "We offer a return policy within 30 days to ensure the best fit for both pet and family." },
];

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  return (
    <div className="section-padding">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-display font-bold mb-3">Get in Touch</h1>
        <p className="text-gray-600">We'd love to hear from you. Reach out with any questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass rounded-xl2 p-8 shadow-soft space-y-4"
        >
          {submitted && <p className="bg-accent/10 text-accent text-sm px-4 py-2 rounded-lg">Thanks! We'll be in touch soon.</p>}
          <input
            placeholder="Your Name"
            {...register("name", { required: true })}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            {...register("message", { required: true })}
            className="w-full px-5 py-3 rounded-xl2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </motion.form>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faLocationDot} className="text-primary text-xl mt-1" />
            <div>
              <p className="font-semibold">Our Shelter</p>
              <p className="text-gray-600 text-sm">Happy Tails Adoption Center, Hyderabad, Telangana, India</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faPhone} className="text-primary text-xl mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-primary text-xl mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600 text-sm">contact@happytails.com</p>
            </div>
          </div>
          <div className="rounded-xl2 overflow-hidden shadow-soft h-56">
            <iframe
              title="Happy Tails Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.google.com/maps?q=Hyderabad,Telangana,India&output=embed"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl2 shadow-soft overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium"
              >
                {faq.q}
                <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;