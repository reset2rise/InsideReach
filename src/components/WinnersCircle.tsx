import { Cross, Music, Users } from 'lucide-react';

export default function WinnersCircle() {
  const programs = [
    {
      icon: Cross,
      title: 'One on One Coaching',
      description: 'Personal guidance for spiritual and personal growth',
      image: 'https://images.pexels.com/photos/8815965/pexels-photo-8815965.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Music,
      title: "Men's Accountability Group",
      description: 'Building brotherhood and strengthening character together',
      image: 'https://images.pexels.com/photos/4009590/pexels-photo-4009590.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Users,
      title: "Pastor's Corner",
      description: 'Wisdom and support for spiritual leaders',
      image: 'https://images.pexels.com/photos/5206960/pexels-photo-5206960.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              The Winner's Circle
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Serving High-Achieving Men
            </p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              The Winner's Circle is designed for men who are committed to excellence in every area of life.
              Through biblical principles, accountability, and brotherhood, we equip leaders to build lasting
              legacies that impact their families, businesses, and communities for generations to come.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-5">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 mx-auto group-hover:scale-110 group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-300">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{program.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center mb-4">{program.description}</p>

                  <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200">
                    Read more
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
