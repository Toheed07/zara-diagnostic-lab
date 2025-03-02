import { useState } from "react";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold font-montserrat tracking-wider">
            ZARA
            <span className="text-coral-red">.</span>
          </span>
          <span className="text-sm text-slate-gray font-medium ml-2 tracking-wide hidden md:block">
            Diagnostic Lab
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Book Appointment Button */}
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a
            href="https://calendly.com/zaradiagnosticlab"
            target="_blank"
            rel="noreferrer"
            className="bg-coral-red text-white px-6 py-2 rounded-full 
            hover:bg-red-700 transition-all duration-300 ease-in-out
            transform hover:scale-105 hover:shadow-lg
            flex items-center gap-2"
          >
            Book Appointment
            <span className="animate-pulse">→</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="hidden max-lg:block cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
          <div 
            className={`fixed right-0 top-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Content */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold font-montserrat">
                  ZARA
                  <span className="text-coral-red">.</span>
                </span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl text-slate-gray hover:text-coral-red"
                >
                  ✕
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <ul className="space-y-4">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-montserrat text-lg text-slate-gray hover:text-coral-red block py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {/* Mobile Book Appointment Button */}
                <li className="pt-4">
                  <a
                    href="https://calendly.com/zaradiagnosticlab"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-coral-red text-white px-6 py-2 rounded-full 
                    hover:bg-red-700 transition-all duration-300 ease-in-out
                    flex items-center justify-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Appointment
                    <span className="animate-pulse">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
