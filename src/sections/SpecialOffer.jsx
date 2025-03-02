import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Button } from "../components";
import { arrowRight } from "../assets/icons";
import { client } from '../lib/sanity';

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
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch section configuration
        const sectionConfig = await client.fetch(`
          *[_type == "specialOfferSection"][0] {
            heading,
            highlightedText,
            description,
            benefits,
            promotionalBanner,
            buttons
          }
        `);

        // Fetch packages
        const packagesData = await client.fetch(`
          *[_type == "healthPackage" && isActive == true] | order(order asc) {
            title,
            price,
            features,
            isPopular
          }
        `);

        setSectionData(sectionConfig);
        setPackages(packagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>;
  }

  const handleLearnMore = () => {
    const targetId = sectionData?.buttons?.learnMoreTarget || 'services';
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='flex justify-between items-center max-xl:flex-col gap-10 max-container py-20'>
      <motion.div 
        variants={fadeIn("right", "tween", 0.2, 1)}
        className='flex flex-1 flex-col'
      >
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-coral-red'>{sectionData?.highlightedText || 'Special'} </span>
          {sectionData?.heading || 'Health Packages'}
        </h2>
        <p className='mt-4 info-text'>
          {sectionData?.description || 
            'Take charge of your health with our comprehensive screening packages. Early detection is key to better health outcomes.'}
        </p>
        <p className='mt-6 info-text'>
          Book your health package today and receive:
          <ul className="mt-4 space-y-2">
            {(sectionData?.benefits || [
              'Free home sample collection',
              'Digital reports within 24 hours',
              'Complimentary doctor consultation'
            ]).map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-coral-red">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button 
            label='Book Now' 
            iconURL={arrowRight}
            onClick={() => window.open(sectionData?.buttons?.bookingUrl || 'https://calendly.com/zaradiagnosticlab', '_blank')}
          />
          <Button
            label='Learn more'
            backgroundColor='bg-white'
            borderColor='border-slate-gray'
            textColor='text-slate-gray'
            onClick={handleLearnMore}
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
        {sectionData?.promotionalBanner && (
          <div className="bg-coral-red/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{sectionData.promotionalBanner.emoji}</span>
              <div>
                <h4 className="text-xl font-bold text-coral-red">
                  {sectionData.promotionalBanner.title}
                </h4>
                <p className="text-slate-gray">
                  {sectionData.promotionalBanner.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default SpecialOffer;
