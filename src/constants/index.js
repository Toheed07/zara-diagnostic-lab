import { facebook, instagram, support, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";
import { microscope, heartPulse, report } from "../assets/icons";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#contact-us", label: "Contact Us" },
];

export const productServices = [
    {
      id: "service-1",
      title: "Blood Tests",
      description: "Comprehensive blood analysis including CBC, diabetes, thyroid, and lipid profiles",
      icon: "🔬",
      features: [
        "Results in 24 hours",
        "Home sample collection",
        "Online reports",
        "Expert analysis"
      ]
    },
    {
      id: "service-2",
      title: "Pathology",
      description: "Expert pathological examination and detailed reporting by specialized pathologists",
      icon: "🧬",
      features: [
        "Expert analysis",
        "Digital reports",
        "Consultation included",
        "Detailed documentation"
      ]
    },
    {
      id: "service-3",
      title: "Health Packages",
      description: "Customized health check-up packages for different age groups and conditions",
      icon: "📋",
      features: ["Comprehensive screening", "Personalized plans", "Follow-up care"]
    },
    {
      id: "service-4",
      title: "Special Tests",
      description: "Specialized diagnostic tests including genetic testing and molecular diagnostics",
      icon: "⚕️",
      features: ["Advanced technology", "Accurate results", "Expert consultation"]
    },
    {
        id: "service-2",
        title: "Pathology",
        description: "Expert pathological examination and detailed reporting by specialized pathologists",
        icon: "🧬",
        features: ["Expert analysis", "Digital reports", "Consultation included"]
      },
      {
        id: "service-3",
        title: "Health Packages",
        description: "Customized health check-up packages for different age groups and conditions",
        icon: "📋",
        features: ["Comprehensive screening", "Personalized plans", "Follow-up care"]
      },
      {
        id: "service-4",
        title: "Special Tests",
        description: "Specialized diagnostic tests including genetic testing and molecular diagnostics",
        icon: "⚕️",
        features: ["Advanced technology", "Accurate results", "Expert consultation"]
      },
      {
        id: "service-4",
        title: "Special Tests",
        description: "Specialized diagnostic tests including genetic testing and molecular diagnostics",
        icon: "⚕️",
        features: ["Advanced technology", "Accurate results", "Expert consultation"]
      }
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
    },
    {
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "$210.20",
    },
    {
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "$220.20",
    },
    {
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "$230.20",
    },
];

export const services = [
    {
        imgURL: microscope,
        label: "Advanced Testing",
        subtext: "State-of-the-art laboratory equipment and testing procedures for accurate results."
    },
    {
        imgURL: heartPulse,
        label: "Expert Care",
        subtext: "Experienced healthcare professionals ensuring quality service and patient care."
    },
    {
        imgURL: report,
        label: "Quick Reports",
        subtext: "Fast turnaround times with detailed digital reports accessible online."
    },
    {
        imgURL: support,
        label: "24/7 Support",
        subtext: "Round-the-clock assistance for appointments, emergencies, and inquiries."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];
