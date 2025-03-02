import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { client, urlFor } from '../lib/sanity';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Fetch categories with their images
        const categoriesData = await client.fetch(`
          *[_type == "galleryCategory" && isActive == true] | order(order asc) {
            _id,
            title,
            description,
            "images": *[_type == "galleryImage" && references(^._id)] | order(order asc) {
              _id,
              title,
              description,
              image,
              order
            }
          }
        `);
        
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>;
  }

  // Get the first category and its first 3 images for initial view
  const firstCategory = categories[0];
  const displayedCategories = showAll ? categories : (firstCategory ? [firstCategory] : []);

  return (
    <section id="gallery" className="padding">
      <div className="max-container">
        <motion.div
          variants={fadeIn("up", "spring", 0, 1)}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl font-palanquin font-bold text-center mb-4">
            Our Case <span className="text-coral-red">Gallery</span>
          </h2>
          <p className="text-slate-gray text-center mb-12 max-w-lg mx-auto info-text">
            Explore our comprehensive collection of medical cases and diagnostic imagery
          </p>
        </motion.div>

        {displayedCategories.map((category, categoryIndex) => (
          <div key={category._id} className="mb-16">
            <motion.h3
              variants={fadeIn("up", "spring", categoryIndex * 0.2, 1)}
              className="text-3xl font-palanquin font-bold mb-6"
            >
              {category.title}
            </motion.h3>
            {category.description && (
              <motion.p
                variants={fadeIn("up", "spring", categoryIndex * 0.2 + 0.1, 1)}
                className="text-slate-gray mb-8"
              >
                {category.description}
              </motion.p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAll ? category.images : category.images.slice(0, 3)).map((image, imageIndex) => (
                <motion.div
                  key={image._id}
                  variants={fadeIn("up", "spring", imageIndex * 0.1, 0.5)}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={urlFor(image.image).width(400).height(300).url()}
                    alt={image.image?.alt || image.title}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-xl">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {categories.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-7 py-4 border border-coral-red 
                text-coral-red font-montserrat text-lg leading-none rounded-full
                hover:bg-coral-red hover:text-white transition-all"
            >
              {showAll ? 'View Less' : 'View More Cases'}
            </button>
          </div>
        )}
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={urlFor(selectedImage.image).width(1200).height(800).url()}
              alt={selectedImage.image?.alt || selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-4 rounded-b-lg">
              <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-white/80 mt-2">{selectedImage.description}</p>
              )}
            </div>
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/75"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 