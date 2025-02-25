import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ServiceModal = ({ service, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{service.icon}</span>
          <h2 className="text-2xl font-bold font-palanquin">{service.title}</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Description</h3>
          <p className="text-slate-600">{service.description}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Key Features</h3>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-600">
                <span className="text-coral-red">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">What to Expect</h3>
          <ul className="space-y-2 text-slate-600">
            <li>• Pre-test preparation instructions</li>
            <li>• Sample collection process</li>
            <li>• Testing timeline</li>
            <li>• Report delivery method</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-slate-600">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Processing Time</p>
              <p>24-48 hours*</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Home Collection</p>
              <p>Available</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Report Format</p>
              <p>Digital & Physical Copy</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Doctor Consultation</p>
              <p>Included</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => {
              window.open('https://calendly.com/strangeelbakyan-justzeus', '_blank');
              onClose();
            }}
            className="flex-1 bg-coral-red text-white px-6 py-3 rounded-full
              hover:bg-red-700 transition-all font-montserrat"
          >
            Book Now
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border-2 border-slate-300
              hover:border-coral-red hover:text-coral-red transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ServiceCard = ({ imgURL, label, subtext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16'>
        <div className='w-11 h-11 flex justify-center items-center bg-coral-red rounded-full'>
          <img src={imgURL} alt={label} width={24} height={24} />
        </div>
        <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
          {label}
        </h3>
        <p className='mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray'>
          {subtext}
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ServiceModal 
            service={{ title: label, description: subtext, icon: imgURL, features: [] }} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceCard;
