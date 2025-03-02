import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { ReviewCard } from "../components";
import { client } from "../lib/sanity";

const CustomerReviews = () => {
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch section configuration
        const sectionConfig = await client.fetch(`
          *[_type == "reviewsSection"][0] {
            heading,
            highlightedText,
            description
          }
        `);

        // Fetch active reviews
        const reviewsData = await client.fetch(`
          *[_type == "review" && isActive == true] | order(order asc) {
            _id,
            customerName,
            rating,
            feedback,
            customerImage
          }
        `);

        setSectionData(sectionConfig);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
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
    <section className='max-container'>
      <motion.div
        variants={fadeIn("up", "spring", 0, 1)}
        className="flex flex-col items-center"
      >
        <h3 className='font-palanquin text-center text-4xl font-bold'>
          {sectionData?.heading || 'What Our'}{' '}
          <span className='text-coral-red'>
            {sectionData?.highlightedText || 'Customers'}
          </span>{' '}
          Say?
        </h3>
        <p className='m-auto mt-4 max-w-lg text-center info-text'>
          {sectionData?.description || 
            'Hear genuine stories from our satisfied customers about their exceptional experiences with us.'}
        </p>
      </motion.div>

      <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
