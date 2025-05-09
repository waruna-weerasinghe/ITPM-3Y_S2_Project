 import React from 'react';

const Shippingreturns = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Shipping & Returns
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-10">
          {/* Shipping Information Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
            <p className="text-lg text-gray-600 mb-6">
              We offer a variety of shipping options to ensure your order reaches you on time. Orders are typically processed
              within 2-3 business days. Delivery times may vary depending on your location and the shipping method chosen.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>International Shipping: 7-10 business days (customs fees may apply)</li>
            </ul>
          </section>

          {/* Returns & Exchanges Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Returns & Exchanges</h2>
            <p className="text-lg text-gray-600 mb-6">
              We strive to ensure you're happy with your purchase. If you're not satisfied for any reason, you can return
              your items within 30 days of receipt for a full refund or exchange.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
              <li>Returns must be in original condition (unworn, unwashed, with tags attached).</li>
              <li>Items purchased on sale or marked as final sale are not eligible for returns or exchanges.</li>
              <li>Please visit our return portal or contact our customer service team for more information.</li>
            </ul>
          </section>

          {/* Additional Information Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Need Further Assistance?</h3>
            <p className="text-lg text-gray-600 mb-6">
              If you have any questions regarding shipping or returns, feel free to contact our support team. We are here to help!
            </p>
            <div className="mt-6 text-center">
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-200"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shippingreturns;
