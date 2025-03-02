import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: "Are you experiencing any fever?",
    options: [
      { text: "Yes", next: 2 },
      { text: "No", next: 3 }
    ]
  },
  {
    id: 2,
    text: "How long have you had the fever?",
    options: [
      { text: "Less than 3 days", next: 4 },
      { text: "More than 3 days", next: 5 }
    ]
  },
  {
    id: 3,
    text: "Do you have any body pain?",
    options: [
      { text: "Yes", next: 6 },
      { text: "No", next: 7 }
    ]
  },
  // Add more questions as needed
];

const recommendations = {
  4: {
    title: "Possible Viral Infection",
    tests: [
      "Complete Blood Count (CBC)",
      "C-Reactive Protein",
      "COVID-19 Test"
    ],
    urgency: "moderate",
    message: "Based on your symptoms, we recommend these tests to check for viral infections."
  },
  5: {
    title: "Possible Bacterial Infection",
    tests: [
      "Complete Blood Count (CBC)",
      "Blood Culture",
      "Procalcitonin Test"
    ],
    urgency: "high",
    message: "Your symptoms suggest a possible bacterial infection. These tests will help confirm."
  },
  6: {
    title: "Musculoskeletal Assessment",
    tests: [
      "ESR Test",
      "CRP Test",
      "Vitamin D Test"
    ],
    urgency: "low",
    message: "These tests will help identify any inflammation or deficiencies."
  },
  7: {
    title: "General Health Check",
    tests: [
      "Basic Health Package",
      "Vitamin Profile"
    ],
    urgency: "low",
    message: "Consider a general health checkup to ensure everything is normal."
  }
};

const SymptomChecker = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [recommendation, setRecommendation] = useState(null);

  const handleOption = (next) => {
    if (recommendations[next]) {
      setRecommendation(recommendations[next]);
    } else {
      setCurrentQuestion(next);
    }
  };

  const resetChecker = () => {
    setCurrentQuestion(1);
    setRecommendation(null);
  };

  const handleBookNow = () => {
    window.open('https://calendly.com/zaradiagnosticlab', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!recommendation ? (
          <>
            <h2 className="text-2xl font-bold font-palanquin mb-6">
              Symptom Checker
            </h2>
            <div className="mb-8">
              {questions.find(q => q.id === currentQuestion)?.text}
            </div>
            <div className="flex gap-4">
              {questions
                .find(q => q.id === currentQuestion)
                ?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOption(option.next)}
                    className="px-6 py-3 rounded-full font-montserrat
                    border-2 border-coral-red text-coral-red hover:bg-coral-red
                    hover:text-white transition-all"
                  >
                    {option.text}
                  </button>
                ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-palanquin text-coral-red">
              {recommendation.title}
            </h2>
            <p className="text-slate-gray">{recommendation.message}</p>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Recommended Tests:</h3>
              <ul className="space-y-2">
                {recommendation.tests.map((test, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-coral-red">•</span>
                    {test}
                  </li>
                ))}
              </ul>
            </div>

            {recommendation.urgency === 'high' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                Please consult with a healthcare provider as soon as possible.
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleBookNow}
                className="px-6 py-3 rounded-full bg-coral-red text-white
                hover:bg-red-700 transition-all flex-1"
              >
                Book Tests Now
              </button>
              <button
                onClick={resetChecker}
                className="px-6 py-3 rounded-full border-2 border-slate-300
                hover:border-coral-red hover:text-coral-red transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SymptomChecker; 