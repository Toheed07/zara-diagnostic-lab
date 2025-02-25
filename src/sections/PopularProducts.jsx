import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { productServices } from "../constants";
import { DiagnosticServiceCard } from "../components";

const PopularProducts = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? productServices : productServices.slice(0, 4);

  return (
    <section id='services' className='max-container max-sm:mt-6 py-10'>
      <motion.div 
        variants={fadeIn("up", "spring", 0, 1)}
        className='flex flex-col justify-start gap-5'
      >
        <h2 className='text-4xl font-palanquin font-bold text-center'>
          Our Diagnostic <span className='text-coral-red'>Services</span>
        </h2>
        <p className='lg:max-w-2xl mx-auto mt-2 font-montserrat text-slate-gray text-center'>
          We provide comprehensive diagnostic services with state-of-the-art technology 
          and expert medical professionals to ensure accurate and timely results.
        </p>
      </motion.div>

      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6'>
        {displayedServices.map((service) => (
          <DiagnosticServiceCard 
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            features={service.features}
          />
        ))}
      </div>

      {productServices.length > 4 && (
        <motion.div 
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="mt-16 text-center"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 
              border-coral-red text-coral-red font-montserrat text-lg 
              rounded-full hover:bg-coral-red hover:text-white 
              transition-all duration-300"
          >
            {showAll ? (
              <>
                Show Less
                <span className="text-xl rotate-180">↓</span>
              </>
            ) : (
              <>
                View More Services
                <span className="text-xl">↓</span>
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div 
        variants={fadeIn("up", "spring", 0.5, 1)}
        className="mt-20 text-center"
      >
        <a
          href="https://calendly.com/strangeelbakyan-justzeus"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-coral-red text-white px-8 py-4 
          rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out
          transform hover:scale-105 hover:shadow-lg text-lg font-montserrat"
        >
          Book Your Test Now
          <span className="animate-pulse text-xl">→</span>
        </a>
      </motion.div>
    </section>
  );
};

export default PopularProducts;
