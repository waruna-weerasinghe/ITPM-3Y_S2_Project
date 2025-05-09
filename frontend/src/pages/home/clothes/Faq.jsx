 import React, { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      question: "What sizes do LuxWear clothes come in?",
      answer: "LuxWear offers a wide range of sizes, from XS to 3XL. You can find size charts on each product page to help you find the perfect fit.",
    },
    {
      question: "How do I track my order?",
      answer: "Once your order has shipped, you will receive an email with a tracking number. You can track your order through the shipping carrier's website.",
    },
    {
      question: "Can I return or exchange my order?",
      answer: "Yes! We offer a 30-day return policy on all unworn and unwashed items. Please refer to our 'Shipping & Returns' page for more details.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we do offer international shipping. Shipping fees and delivery times vary depending on your location. Check out our shipping policy for more details.",
    },
    {
      question: "How do I contact customer service?",
      answer: "You can contact our customer service team via email at support@luxwear.com, or by calling us at +1 (800) 555-1234.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-8">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-400 mb-12">Find answers to the most common questions below. If you need further assistance, feel free to reach out!</p>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white/5 rounded-lg shadow-xl backdrop-blur-md border border-gray-700">
              <button
                className="w-full text-left px-6 py-4 text-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => toggleAnswer(index)}
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
