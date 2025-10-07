import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to learn more about our programs and how you can get involved.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300 flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@insidereachministries.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300 flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">Your City, Your State</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-100">
                <h4 className="font-bold text-gray-900 mb-2">Office Hours</h4>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-700">Saturday - Sunday: Closed</p>
              </div>
            </div>

            <div>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="bg-gradient-to-br from-gray-50 to-teal-50 p-8 rounded-2xl shadow-lg border-2 border-gray-100"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <input name="bot-field" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition-colors duration-200 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
