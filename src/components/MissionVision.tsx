import { Target, Heart } from 'lucide-react';

export default function MissionVision() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Purpose
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Demonstrating the love of Christ and igniting change by fortifying the family
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-green-50 to-teal-50 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                To demonstrate the love of Christ and ignite change by fortifying the family as the foundation
                of the community and economy. We believe in building strong families through faith-based programs,
                biblical resources, and compassionate support.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Changing the world…One Person, One Family, One Business, One Community at a time.
              </p>

              <div className="bg-white/60 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="text-base text-gray-800 italic">
                  "A good man leaveth an inheritance to his children's children: And the wealth of the sinner
                  is laid up for the just." <span className="block text-sm mt-1 font-semibold">— Proverbs 13:22 KJV</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
