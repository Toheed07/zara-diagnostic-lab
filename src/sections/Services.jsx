import { useState, useEffect } from "react";
import { ServiceCard } from "../components";
import { client } from '../lib/sanity';
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "coreService" && isActive == true] | order(order asc) {
            label,
            subtext,
            "iconUrl": icon.asset->url,
            features,
            processingTime,
            homeCollection,
            reportFormat,
            doctorConsultation
          }
        `);
        setServices(data);
        const sectionConfig = await client.fetch(`
          *[_type == "coreServicesSection"][0] {
            heading,
            highlightedText,
            description
          }
        `);
        setSectionData(sectionConfig);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="min-h-[200px] flex items-center justify-center">Loading...</div>;
  }

  return (
      <section className='max-container flex flex-col items-center py-10'>
      <motion.div 
        variants={fadeIn("up", "spring", 0, 1)}
        className='flex flex-col justify-between gap-5 mb-16 text-center'
      >
        <h2 className='text-4xl font-palanquin font-bold'>
          {sectionData?.heading || 'Our Core'}{' '}
          <span className='text-coral-red'>
            {sectionData?.highlightedText || 'Services'}
          </span>
        </h2>
        {sectionData?.description && (
          <p className='lg:max-w-2xl mx-auto mt-2 font-montserrat text-slate-gray'>
            {sectionData.description}
          </p>
        )}
      </motion.div>

      <div className='flex justify-between flex-wrap w-full gap-9'>
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
