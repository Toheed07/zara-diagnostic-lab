import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Button } from "../components";
import { microscope } from "../assets/images";
import { client, urlFor } from '../lib/sanity';

const SuperQuality = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "aboutSection"][0] {
            mainHeading,
            highlightedWords,
            description,
            statistics,
            mainImage {
              asset->,
              alt
            },
            certificationCard {
              "iconUrl": icon.asset->url,
              title,
              description
            },
            quickResultsCard {
              emoji,
              title,
              description
            },
            buttons
          }
        `);
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about section data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLearnMore = () => {
    const targetId = aboutData?.buttons?.learnMoreTarget || 'services';
    document.getElementById(targetId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>;
  }

  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container py-20'
    >
      <motion.div 
        variants={fadeIn("right", "tween", 0.2, 1)}
        className='flex flex-1 flex-col'
      >
        <h2 className='font-palanquin text-4xl lg:max-w-lg font-bold'>
          {aboutData?.mainHeading || 'Advanced Diagnostics with'}
          {aboutData?.highlightedWords ? (
            aboutData.highlightedWords.map((word, index) => (
              <span key={index}>
                {index === 0 ? ' ' : ' and '}
                <span className='text-coral-red'>{word}</span>
              </span>
            ))
          ) : (
            <>
              <span className='text-coral-red'> Precision </span>
              and <span className='text-coral-red'>Care</span>
            </>
          )}
        </h2>
        
        <div className="mt-4 flex flex-col gap-4 lg:max-w-lg">
          <p className='info-text'>
            {aboutData?.description || 
              'At ZARA Diagnostic Lab, we combine cutting-edge technology with expert medical professionals to deliver accurate and reliable diagnostic results.'}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(aboutData?.statistics || [
              { number: "99%", text: "Accuracy Rate" },
              { number: "30+", text: "Expert Staff" },
              { number: "24/7", text: "Support" },
              { number: "1000+", text: "Tests Monthly" }
            ]).map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl font-bold text-coral-red">{stat.number}</span>
                <span className="text-slate-gray font-montserrat">{stat.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-11 flex flex-wrap gap-4'>
          <Button 
            label='Book Appointment' 
            onClick={() => window.open(aboutData?.buttons?.bookingUrl || 'https://calendly.com/zaradiagnosticlab', '_blank')}
          />
          <button 
            className="flex items-center gap-2 px-7 py-4 border border-coral-red 
              text-coral-red font-montserrat text-lg leading-none rounded-full
              hover:bg-coral-red hover:text-white transition-all"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>
      </motion.div>

      <motion.div 
        variants={fadeIn("left", "tween", 0.2, 1)}
        className='flex-1 flex justify-center items-center relative'
      >
        <div className="relative w-full aspect-square max-w-[600px]">
          {/* Main Lab Image */}
          <img
            src={aboutData?.mainImage ? urlFor(aboutData.mainImage).url() : microscope}
            alt={aboutData?.mainImage?.alt || 'Modern Lab Equipment'}
            className='object-cover rounded-2xl w-full h-full'
          />
          
          {/* Floating Card 1 - Certification */}
          <div className="absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl
            max-w-[200px] z-10">
            {aboutData?.certificationCard ? (
              <>
                <img
                  src={aboutData.certificationCard.iconUrl}
                  alt={aboutData.certificationCard.title}
                  className='w-16 h-16 object-contain mb-2'
                />
                <h4 className="font-bold text-lg">{aboutData.certificationCard.title}</h4>
                <p className="text-sm text-slate-gray">{aboutData.certificationCard.description}</p>
              </>
            ) : (
              <>
                <img
                  src={microscope}
                  alt='Lab Certification'
                  className='w-16 h-16 object-contain mb-2'
                />
                <h4 className="font-bold text-lg">NABL Accredited</h4>
                <p className="text-sm text-slate-gray">Internationally recognized standards</p>
              </>
            )}
          </div>

          {/* Floating Card 2 - Quick Results */}
          <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-2xl shadow-xl
            max-w-[200px] z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-coral-red text-2xl">
                {aboutData?.quickResultsCard?.emoji || '⚡'}
              </span>
              <h4 className="font-bold">
                {aboutData?.quickResultsCard?.title || 'Quick Results'}
              </h4>
            </div>
            <p className="text-sm text-slate-gray">
              {aboutData?.quickResultsCard?.description || 'Reports within 24 hours'}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SuperQuality;
