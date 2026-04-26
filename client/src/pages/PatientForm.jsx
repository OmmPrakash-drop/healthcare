import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitPatient } from '../services/api';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    helpType: '',
    description: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const helpTypes = [
    { value: 'medical-companion', label: 'Medical Companion' },
    { value: 'errands', label: 'Errands & Shopping' },
    { value: 'prescription-pickup', label: 'Prescription Pickup' },
    { value: 'meal-delivery', label: 'Meal Delivery' },
    { value: 'emotional-support', label: 'Emotional Support' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.helpType || !formData.description) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      setIsLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ type: 'error', message: 'Please enter a valid phone number' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await submitPatient(formData);
      setStatus({ type: 'success', message: response.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        helpType: '',
        description: ''
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to submit form. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Patient Support Request</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Fill out the form below and we'll connect you with a volunteer who can help.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {status.message && (
              <div className={`mb-8 p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State"
                  required
                />
              </div>

              {/* Help Type */}
              <div>
                <label htmlFor="helpType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Help Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="helpType"
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a type of help</option>
                  {helpTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Needs <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe what kind of help you need..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30"
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Free Service</h3>
                  <p className="text-gray-600 text-sm">Our patient support services are completely free of charge.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientForm;