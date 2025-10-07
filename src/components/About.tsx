import { Users, Heart, HandHeart, Home } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Faith-Centered',
      description: 'Rooted in Christian values and guided by love, compassion, and grace in all we do'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building strong networks of support where families can connect, grow, and thrive together'
    },
    {
      icon: HandHeart,
      title: 'Compassionate Care',
      description: 'Meeting families where they are with understanding, empathy, and practical support'
    },
    {
      icon: Home,
      title: 'Family First',
      description: 'Prioritizing the wellbeing and unity of families as the foundation of healthy communities'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Inside Reach Ministries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-200"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg mb-5 group-hover:scale-110 group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300">
                    <Icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
