import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitVolunteer } from '../services/api';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    location: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const availabilityOptions = [
    { value: 'weekdays-morning', label: 'Weekdays - Morning' },
    { value: 'weekdays-afternoon', label: 'Weekdays - Afternoon' },
    { value: 'weekdays-evening', label: 'Weekdays - Evening' },
    { value: 'weekends-morning', label: 'Weekends - Morning' },
    { value: 'weekends-afternoon', label: 'Weekends - Afternoon' },
    { value: 'weekends-evening', label: 'Weekends - Evening' },
    { value: 'flexible', label: 'Flexible / Anytime' }
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
    if (!formData.name || !formData.email || !formData.phone || !formData.skills || !formData.availability || !formData.location) {
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
      const response = await submitVolunteer(formData);
      setStatus({ type: 'success', message: response.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        location: ''
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Become a Volunteer</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Join our community of compassionate volunteers and make a real difference in people's lives.
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us about your skills, experience, and why you want to volunteer..."
                  required
                ></textarea>
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your availability</option>
                  {availabilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, State"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/30"
              >
                {isLoading ? 'Submitting...' : 'Register as Volunteer'}
              </button>
            </form>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Why Volunteer With Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Make a real difference in your community</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Flexible scheduling options</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Free training and support</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Join a caring community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerForm;