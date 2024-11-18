import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { MdFeedback } from 'react-icons/md'

const Contact = () => {
  return (
    <div className="space-y-8 mt-8">
      {/* Contact Header */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center">Get in Touch</h1>
      <p className="text-lg text-gray-600 text-center">
        We’re here to help. Whether you have a question, feedback, or need support, feel free to reach out to us.
      </p>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <FaPhone className="text-3xl text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800 mt-4">Call Us</h2>
          <p className="text-gray-600 mt-2">+1 234 567 890</p>
        </div>

        <div className="flex flex-col items-center">
          <FaEnvelope className="text-3xl text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800 mt-4">Email Us</h2>
          <p className="text-gray-600 mt-2">support@prescripto.com</p>
        </div>

        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-3xl text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800 mt-4">Visit Us</h2>
          <p className="text-gray-600 mt-2">123 Health St., MedCity</p>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <MdFeedback className="text-blue-600" /> Feedback Form
        </h2>
        <p className="text-gray-600 mt-2">
          Your feedback helps us improve our service. Please let us know your thoughts below.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
