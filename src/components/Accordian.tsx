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
      question: "What are the advantages of your service?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 2,
      question:
        "Are there any fees or commissions in addition to the monthly subscription?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 3,
      question: "You really don't charge per user? Why not?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 4,
      question: "What happens when I go over my monthly active limit?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 5,
      question:
        "Can your service help me understand how to work with my product?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 6,
      question: "Which third-party application do you integrate with?",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      id: 7,
      question: "I have another question!",
      answer:
        "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
  ];

    function setBannerOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="relative font-inter antialiased">
      <div className="relative flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-24">
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
