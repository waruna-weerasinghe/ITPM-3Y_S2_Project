 import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Privacy Policy
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-10">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Introduction</h2>
            <p className="text-lg text-gray-600 mb-6">
              At LuxWear, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal 
              information when you visit our website and make purchases.
            </p>
          </section>

          {/* Information We Collect Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Information We Collect</h2>
            <p className="text-lg text-gray-600 mb-6">
              We collect personal information that you provide to us directly, such as when you make a purchase or sign up for our newsletter. This may include:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Payment information</li>
              <li>Shipping and billing addresses</li>
            </ul>
          </section>

          {/* How We Use Your Information Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How We Use Your Information</h2>
            <p className="text-lg text-gray-600 mb-6">
              The information we collect helps us provide a better experience for you. We use this data to:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
              <li>Process transactions and fulfill orders</li>
              <li>Improve customer service and tailor our offerings</li>
              <li>Send periodic emails regarding your order or other products and services</li>
            </ul>
          </section>

          {/* Data Protection Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Data Protection</h2>
            <p className="text-lg text-gray-600 mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. This includes using encryption to protect sensitive data during transmission.
            </p>
          </section>

          {/* Third-Party Disclosure Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Third-Party Disclosure</h2>
            <p className="text-lg text-gray-600 mb-6">
              We do not sell, trade, or rent your personal information to third parties. However, we may share information with trusted partners to improve our service delivery or comply with legal requirements.
            </p>
          </section>

          {/* Contact Us Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Questions or Concerns?</h3>
            <p className="text-lg text-gray-600 mb-6">
              If you have any questions about our privacy practices, please feel free to contact us at any time.
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

export default PrivacyPolicy;
