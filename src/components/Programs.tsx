import { Users, Heart, HandHeart } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      icon: Users,
      title: 'Coaching & Counseling',
      description: 'One-on-one guidance to help you navigate life\'s challenges with faith and wisdom',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Heart,
      title: 'Marriage Enrichment',
      description: 'Strengthening relationships through biblically-based principles and practical tools',
      image: 'https://images.pexels.com/photos/8363026/pexels-photo-8363026.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: HandHeart,
      title: 'Community Engagement',
      description: 'Building connections that transform neighborhoods and strengthen our collective impact',
      image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Do for YOU?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are changing the world one person, one family, one business, one community at a time!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-green-200"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-5 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{program.description}</p>

                    <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
