import { useState, useEffect } from "react";
import { copyrightSign } from "../assets/icons";
import { client, urlFor } from "../lib/sanity";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [footerConfig, setFooterConfig] = useState(null);
  const [footerSections, setFooterSections] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Fetch footer configuration
        const config = await client.fetch(`
          *[_type == "footerConfig"][0] {
            companyDescription,
            copyrightText,
            privacyPolicyLink,
            termsLink
          }
        `);

        // Fetch footer sections
        const sections = await client.fetch(`
          *[_type == "footerSection"] | order(order asc) {
            _id,
            title,
            links
          }
        `);

        // Fetch social media links
        const social = await client.fetch(`
          *[_type == "socialMediaLink" && isActive == true] | order(order asc) {
            _id,
            platform,
            url,
            icon
          }
        `);

        setFooterConfig(config);
        setFooterSections(sections);
        setSocialLinks(social);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return <footer className="bg-black padding-x padding-t pb-8">
      <div className="max-container">Loading...</div>
    </footer>;
  }

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
            {footerConfig?.companyDescription || 
              'Your trusted partner in diagnostic healthcare. Providing accurate and reliable testing services with state-of-the-art technology.'}
          </p>
          <div className='flex items-center gap-5 mt-8'>
            {socialLinks.map((social) => (
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full
                  hover:bg-coral-red hover:text-white transition-colors group'
                key={social._id}
              >
                <img 
                  src={urlFor(social.icon).width(24).height(24).url()}
                  alt={social.platform}
                  width={24} 
                  height={24}
                  className="group-hover:brightness-200"
                />
              </a>
            ))}
          </div>
        </div>

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {footerSections.map((section) => (
            <div key={section._id}>
              <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link, index) => (
                  <li
                    className='mt-3 font-montserrat text-base leading-normal text-white-400 
                      hover:text-coral-red transition-colors'
                    key={index}
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
          <p>{footerConfig?.copyrightText || 'Copyright © 2025 ZARA Diagnostic Lab. All rights reserved.'}</p>
        </div>
        <div className="flex gap-4 font-montserrat">
          <a 
            href={footerConfig?.privacyPolicyLink || '/privacy'} 
            className="hover:text-coral-red transition-colors"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a 
            href={footerConfig?.termsLink || '/terms'} 
            className="hover:text-coral-red transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
