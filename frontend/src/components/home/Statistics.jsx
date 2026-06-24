import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Pets Adopted", value: 1200 },
  { label: "Happy Families", value: 950 },
  { label: "Partner Shelters", value: 40 },
  { label: "Volunteers", value: 180 },
];

const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

const Statistics = () => {
  return (
    <section className="section-padding bg-dark text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-3xl md:text-5xl font-display font-bold text-secondary mb-2">
              <Counter value={s.value} />
            </p>
            <p className="text-gray-300 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;