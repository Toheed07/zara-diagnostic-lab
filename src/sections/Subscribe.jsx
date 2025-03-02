import { Button } from "../components";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { arrowRight } from "../assets/icons";

const Subscribe = () => {
  const handleContact = () => {
    const email = "zaradiagnosticlab@gmail.com";
    const subject = "Inquiry for Zara Diagnostic Lab";
    const body = `Hello,

I am interested in learning more about your diagnostic services.

Looking forward to hearing from you.

Best regards`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id='contact-us' className=' '>
      <motion.div
        variants={fadeIn("up", "spring", 0, 1)}
        className='bg-gradient-to-b from-white to-slate-50 rounded-2xl px-8 py-8 sm:px-12 sm:py-8 flex flex-col items-center text-center'
      >
        <h3 className='text-4xl sm:text-5xl leading-[1.2] font-palanquin font-bold max-w-lg'>
          Let&apos;s Connect and
          <span className='text-coral-red'> Discuss </span>
          Your Health Needs
        </h3>
        <p className='mt-6 text-lg text-slate-gray max-w-lg'>
          Have questions about our services? Want to book an appointment? 
          We&apos;re here to help you with all your diagnostic needs.
        </p>

        <div className='mt-10 flex flex-col sm:flex-row items-center gap-4'>
          <Button 
            label='Send us an Email' 
            iconURL={arrowRight}
            onClick={handleContact}
          />
          <p className='text-slate-gray'>
            or call us at{' '}
            <a 
              href="tel:+9101962262356" 
              className='text-coral-red hover:underline font-semibold'
            >
              +91 01962262356
            </a>
          </p>
        </div>

        <div className='mt-8 flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-gray'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            Open Monday to Sunday
          </div>
          <span className='hidden sm:inline'>•</span>
          <div>7:30 AM - 7:30 PM</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
