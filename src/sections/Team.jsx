import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { TeamCard } from "../components";
import { client } from '../lib/sanity';

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch section configuration
        const sectionConfig = await client.fetch(`
          *[_type == "teamSection"][0] {
            heading,
            highlightedText,
            description
          }
        `);

        // Fetch team members
        const teamData = await client.fetch(`
          *[_type == "teamMember" && isActive == true] | order(order asc) {
            name,
            title,
            description,
            image,
            socialLinks
          }
        `);

        setSectionData(sectionConfig);
        setTeamMembers(teamData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>;
  }

  return (
    <section id="team" className="max-container py-20 padding">
      <motion.div 
        variants={fadeIn("up", "spring", 0, 1)}
        className="flex flex-col items-center"
      >
        <h2 className="text-4xl font-palanquin font-bold text-center">
          {sectionData?.heading || 'Meet Our'}{' '}
          <span className="text-coral-red">
            {sectionData?.highlightedText || 'Expert Team'}
          </span>
        </h2>
        <p className="mt-4 lg:max-w-2xl text-center info-text">
          {sectionData?.description || 
            'Our team of experienced healthcare professionals is dedicated to providing you with accurate diagnostics and exceptional care.'}
        </p>
      </motion.div>

      <div className="mt-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            key={index}
          >
            <TeamCard member={member} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
