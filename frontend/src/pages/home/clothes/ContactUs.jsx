 import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending the message (replace with real logic if needed)
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000); // Hide after 4 seconds
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-400">We’re here to help. Let’s talk about your questions, feedback, or business opportunities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition"
              >
                Send Message
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mt-4 text-green-400 font-medium animate-pulse">
                  ✔️ Message sent successfully!
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8 text-gray-400">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-white">Email Us</h4>
                <p>support@luxwear.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-white">Call Us</h4>
                <p>+1 (800) 555-1234</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-white">Visit Us</h4>
                <p>LuxWear HQ<br />123 Fashion Ave, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
