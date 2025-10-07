import { MessageSquare, BookOpen, Heart } from 'lucide-react';

export default function BridgeBuilders() {
  const programs = [
    {
      icon: MessageSquare,
      title: 'Community Forums',
      description: 'Open dialogue and connection opportunities for neighbors',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: BookOpen,
      title: 'Community Trainings',
      description: 'Empowering residents with practical skills and knowledge',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Heart,
      title: 'Community Service',
      description: 'Hands-on projects that transform neighborhoods together',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
                Bridge Builders
              </h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partnering & Fundraising
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bridge Builders creates connections that span divides and unite communities. Through strategic
                partnerships and collaborative fundraising, we bring together resources, people, and vision to
                create lasting change. Together, we're building bridges between neighbors, organizations, and
                opportunities—transforming isolated efforts into powerful movements for good.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bridge over water"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-teal-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent"></div>
                  </div>

                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 mx-auto group-hover:scale-110 group-hover:from-teal-600 group-hover:to-blue-600 transition-all duration-300">
                      <Icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-blue-700 mb-3">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{program.description}</p>

                    <button className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200">
                      Read more
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
