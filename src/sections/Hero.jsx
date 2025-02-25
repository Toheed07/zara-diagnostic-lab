import { useState } from 'react';
import { Button } from "../components";
import { arrowRight } from "../assets/icons";
import SymptomChecker from '../components/SymptomChecker';
// import labImage from "../assets/images/lab-image.jpg"; // You'll need to add an appropriate lab image

const Hero = () => {
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);

  const handleBookNow = () => {
    window.open('https://calendly.com/strangeelbakyan-justzeus', '_blank', 'noopener,noreferrer');
  };

  const handleViewServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28 max-sm:pt-16 sm:my-4'>
        <p className='text-3xl max-sm:text-2xl font-montserrat text-coral-red'>
          Advanced Diagnostic Services
        </p>

        <h1 className='mt-10 max-sm:mt-6 font-palanquin text-6xl max-sm:text-4xl max-sm:leading-[1.2] font-bold'>
          <span className='xl:bg-white xl:whitespace-nowrap relative pr-10'>
            Your Health
          </span>
          <br />
          <span className='text-coral-red inline-block mt-3'>Our Priority</span>
        </h1>
        
        <p className='font-montserrat text-slate-gray text-lg max-sm:text-base leading-8 mt-6 mb-8 sm:max-w-sm'>
          Providing accurate and timely diagnostic services with state-of-the-art 
          technology and expert pathologists for comprehensive healthcare solutions.
        </p>

        <div className="flex gap-4 flex-wrap max-sm:justify-center max-sm:w-full">
          <Button 
            label='Book Now' 
            iconURL={arrowRight}
            onClick={handleBookNow}
            className="max-sm:w-full max-sm:justify-center" 
          />
          <button 
            className="flex items-center gap-2 px-7 py-4 border border-coral-red 
              text-coral-red font-montserrat text-lg max-sm:text-base leading-none rounded-full
              hover:bg-coral-red hover:text-white transition-all
              max-sm:flex-1 max-sm:justify-center"
            onClick={handleViewServices} 
          >
            View Services
          </button>
          <button 
            onClick={() => setIsCheckerOpen(true)}
            className="flex items-center gap-2 px-7 py-4 bg-slate-100 
              text-slate-700 font-montserrat text-lg max-sm:text-base leading-none rounded-full
              hover:bg-slate-200 transition-all
              max-sm:flex-1 max-sm:justify-center"
          >
            <span className="text-xl">🔍</span>
            Check Symptoms
          </button>
        </div>

        <div className='flex justify-start items-start flex-wrap w-full mt-20 max-sm:mt-12 gap-16 max-sm:gap-8 max-sm:justify-center'>
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '50k+', label: 'Satisfied Patients' },
            { value: '100+', label: 'Test Types' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className='text-4xl max-sm:text-3xl font-palanquin font-bold'>{stat.value}</p>
              <p className='leading-7 font-montserrat text-slate-gray max-sm:text-sm'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 max-sm:py-20 bg-pale-blue rounded-2xl'>
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 rounded-2xl">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-white/80 rounded-2xl">
            <h3 className="text-2xl max-sm:text-xl font-bold text-coral-red mb-4">Image of the Lab</h3>
            <ul className="text-slate-gray text-lg space-y-2">
            </ul>
          </div>
        </div>
      </div>

      <SymptomChecker 
        isOpen={isCheckerOpen} 
        onClose={() => setIsCheckerOpen(false)} 
      />
    </section>
  );
};

export default Hero;
