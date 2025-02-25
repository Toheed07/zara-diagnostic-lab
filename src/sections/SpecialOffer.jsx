import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Button } from "../components";
import { arrowRight } from "../assets/icons";

const HealthPackage = ({ title, price, features }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
  >
    <h3 className="text-xl font-bold font-palanquin text-coral-red">{title}</h3>
    <p className="text-3xl font-bold mt-2 font-palanquin">{price}</p>
    <ul className="mt-4 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-slate-gray">
          <span className="text-coral-red">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

const SpecialOffer = () => {
  const packages = [
    {
      title: "Basic Health Screening",
      price: "₹999",
      features: [
        "Complete Blood Count",
        "Blood Sugar Test",
        "Lipid Profile",
        "Liver Function Test",
        "Free Doctor Consultation"
      ]
    },
    {
      title: "Comprehensive Package",
      price: "₹2499",
      features: [
        "All Basic Package Tests",
        "Thyroid Profile",
        "Vitamin D & B12",
        "Kidney Function Test",
        "ECG",
        "Priority Processing"
      ]
    }
  ];

  return (
    <section className='flex justify-between items-center max-xl:flex-col gap-10 max-container py-20'>
      <motion.div 
        variants={fadeIn("right", "tween", 0.2, 1)}
        className='flex flex-1 flex-col'
      >
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-coral-red'>Special </span>
          Health Packages
        </h2>
        <p className='mt-4 info-text'>
          Take charge of your health with our comprehensive screening packages. 
          Early detection is key to better health outcomes.
        </p>
        <p className='mt-6 info-text'>
          Book your health package today and receive:
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-coral-red">•</span>
              Free home sample collection
            </li>
            <li className="flex items-center gap-2">
              <span className="text-coral-red">•</span>
              Digital reports within 24 hours
            </li>
            <li className="flex items-center gap-2">
              <span className="text-coral-red">•</span>
              Complimentary doctor consultation
            </li>
          </ul>
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button 
            label='Book Now' 
            iconURL={arrowRight}
            onClick={() => window.open('https://calendly.com/strangeelbakyan-justzeus', '_blank')}
          />
          <Button
            label='Learn more'
            backgroundColor='bg-white'
            borderColor='border-slate-gray'
            textColor='text-slate-gray'
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </motion.div>

      <motion.div 
        variants={fadeIn("left", "tween", 0.2, 1)}
        className='flex-1 flex flex-col gap-8'
      >
        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <HealthPackage key={index} {...pkg} />
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="bg-coral-red/10 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎉</span>
            <div>
              <h4 className="text-xl font-bold text-coral-red">Special Discount</h4>
              <p className="text-slate-gray">20% off for senior citizens and family packages</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SpecialOffer;
