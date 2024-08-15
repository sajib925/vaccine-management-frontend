"use client"
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
      question: "What should I do if I experience side effects after vaccination?",
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
  

    function setBannerOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="relative font-inter antialiased">
      <div className="relative flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="max-w-screen-xl w-full mx-auto px-4 md:px-6 py-10 lg:py-20">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">FAQs</h1>
          <div className="divide-y divide-slate-200">
            {panels.map((panel) => (
              <div key={panel.id} className="py-2">
                <h2>
                  <button
                    id={`faqs-title-${panel.id}`}
                    type="button"
                    className="flex items-center justify-between w-full text-left font-semibold py-2"
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
                    <p className="pb-3">{panel.answer}</p>
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
