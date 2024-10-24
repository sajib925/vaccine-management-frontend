"use client";
import React, { useState } from "react";

const FaqAccordion: React.FC = () => {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);

  const togglePanel = (panelIndex: number) => {
    setExpandedPanels((prevState) =>
      prevState.includes(panelIndex)
        ? prevState.filter((index) => index !== panelIndex)
        : [...prevState, panelIndex]
    );
  };

  const panels = [
    {
      id: 1,
      question: "How can I register for a vaccination?",
      answer:
        "To register for a vaccination, simply create an account on our platform, log in, and follow the steps to book your vaccination slot.",
    },
    {
      id: 2,
      question: "How do I check my vaccination schedule?",
      answer:
        "You can check your vaccination schedule by logging into your account and navigating to the 'My Schedule' section. All your upcoming appointments will be listed there.",
    },
    {
      id: 3,
      question: "Can I reschedule my vaccination appointment?",
      answer:
        "Yes, you can reschedule your appointment from the 'My Schedule' section. Please note that rescheduling is subject to availability.",
    },
    {
      id: 4,
      question: "What documents do I need to bring on the day of vaccination?",
      answer:
        "On the day of vaccination, please bring a valid ID and any other documents specified in your appointment confirmation.",
    },
    {
      id: 5,
      question: "How do I get a digital copy of my vaccination certificate?",
      answer:
        "After your vaccination, a digital copy of your certificate will be available for download in your account under the 'Certificates' section.",
    },
    {
      id: 6,
      question:
        "What should I do if I experience side effects after vaccination?",
      answer:
        "If you experience any side effects, please consult your doctor immediately. You can also report side effects through our platform under the 'Report Side Effects' section.",
    },
    {
      id: 7,
      question: "How can I update my personal information?",
      answer:
        "To update your personal information, log in to your account, go to 'Profile Settings', and make the necessary changes.",
    },
  ];


  return (
    <div className="relative">
      <div className="flex flex-col justify-center">
        <div className="max-w-screen-xl w-full mx-auto px-4 md:px-6 py-10 lg:py-20">
          <div className="mb-6 md:mb-10">
            <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
              FAQ
            </span>
            <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
              Frequently Asked Questions: Your Top Queries Answered
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {panels.map((panel) => (
              <div key={panel.id} className="py-2">
                <h2>
                  <button
                    id={`faqs-title-${panel.id}`}
                    type="button"
                    className="flex items-center justify-between w-full text-xl lg:text-2xl text-left font-medium py-2"
                    onClick={() => togglePanel(panel.id)}
                    aria-expanded={expandedPanels.includes(panel.id)}
                    aria-controls={`faqs-text-${panel.id}`}
                  >
                    <span>{panel.question}</span>
                    <svg
                      className="fill-indigo-500 shrink-0 ml-8"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                          expandedPanels.includes(panel.id) ? "rotate-180" : ""
                        }`}
                      />
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                          expandedPanels.includes(panel.id) ? "rotate-180" : ""
                        }`}
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id={`faqs-text-${panel.id}`}
                  role="region"
                  aria-labelledby={`faqs-title-${panel.id}`}
                  className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedPanels.includes(panel.id)
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-3 text-base">{panel.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
