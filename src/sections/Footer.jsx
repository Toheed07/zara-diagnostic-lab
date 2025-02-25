import { copyrightSign } from "../assets/icons";
import { socialMedia } from "../constants";

const Footer = () => {
  const labFooterLinks = [
    {
      title: "Our Services",
      links: [
        { name: "Blood Tests", link: "#services" },
        { name: "Health Packages", link: "#services" },
        { name: "Pathology", link: "#services" },
        { name: "Home Collection", link: "#services" },
        { name: "Corporate Health", link: "#services" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "About Us", link: "#about-us" },
        { name: "Book Appointment", link: "https://calendly.com/strangeelbakyan-justzeus" },
        { name: "Download Reports", link: "/reports" },
        { name: "Privacy Policy", link: "/privacy" },
        { name: "Terms of Service", link: "/terms" },
      ],
    },
    {
      title: "Contact Us",
      links: [
        { name: "info@zaralab.com", link: "mailto:info@zaralab.com" },
        { name: "+1 (555) 123-4567", link: "tel:+15551234567" },
        { name: "123 Medical Plaza", link: "https://maps.google.com" },
        { name: "New York, NY 10001", link: "https://maps.google.com" },
        { name: "Mon-Sat: 7am - 9pm", link: "#" },
      ],
    },
  ];

  return (
    <footer className='max-container bg-black padding-x padding-t pb-8'>
      <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col'>
        <div className='flex flex-col items-start'>
          <a href='/' className="flex items-center">
            <span className="text-3xl font-bold font-montserrat tracking-wider text-white">
              ZARA
              <span className="text-coral-red">.</span>
            </span>
            <span className="text-sm text-white/70 font-medium ml-2 tracking-wide">
              Diagnostic Lab
            </span>
          </a>
          <p className='mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm'>
            Your trusted partner in diagnostic healthcare. 
            Providing accurate and reliable testing services 
            with state-of-the-art technology.
          </p>
          <div className='flex items-center gap-5 mt-8'>
            {socialMedia.map((icon) => (
              <a
                href={`https://${icon.alt}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full
                  hover:bg-coral-red hover:text-white transition-colors group'
                key={icon.alt}
              >
                <img 
                  src={icon.src} 
                  alt={icon.alt} 
                  width={24} 
                  height={24}
                  className="group-hover:brightness-200"
                />
              </a>
            ))}
          </div>
        </div>

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {labFooterLinks.map((section) => (
            <div key={section.title}>
              <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 font-montserrat text-base leading-normal text-white-400 
                      hover:text-coral-red transition-colors'
                    key={link.name}
                  >
                    <a 
                      href={link.link}
                      target={link.link.startsWith('http') ? '_blank' : '_self'}
                      rel={link.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat'>
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          />
          <p>Copyright © 2025 ZARA Diagnostic Lab. All rights reserved.</p>
        </div>
        <div className="flex gap-4 font-montserrat">
          <a href="/privacy" className="hover:text-coral-red transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-coral-red transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
