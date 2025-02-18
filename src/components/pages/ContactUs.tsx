// src/pages/Contact.tsx
import React, { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Implement your contact form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📍</span> 123 Education Street, Learning City
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📧</span> support@tundua.edu
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📱</span> +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Office Hours</h2>
            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="text-green-600 text-center">Message sent successfully!</div>
          )}
          {status === 'error' && (
            <div className="text-red-600 text-center">Failed to send message. Please try again.</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;