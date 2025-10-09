import { Heart, Book, Users, Sparkles } from 'lucide-react';

export default function MarriageEnrichment() {
  const services = [
    {
      icon: Users,
      title: 'Premarital Counseling',
      description: 'Build a strong foundation for your marriage from the start',
      image: 'https://images.pexels.com/photos/6224396/pexels-photo-6224396.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Officiant Services',
      description: 'Beautiful, meaningful ceremonies tailored to your love story',
      image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'green'
    },
    {
      icon: Book,
      title: 'Biblically-Based Resources',
      description: 'Scripture-centered tools to strengthen your relationship',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'green'
    },
    {
      icon: Sparkles,
      title: 'Play Dates for Couples',
      description: 'Fun, engaging activities to reignite the spark in your marriage',
      image: 'https://images.pexels.com/photos/8111855/pexels-photo-8111855.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'blue'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-green-600 bg-clip-text text-transparent">
                Marriage Enrichment on Fire
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mt-12">
              From the start, your relationship deserves the very best support that God can give it.
              That's why our services are designed to help you build a solid foundation, develop strong
              and consistent habits and grow together, all through the wonderful gift of play.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
              Combined with the Word of God, professional certifications and over 30 years of relationship
              experience, We are prepared to partner with you to make your marriage...PlayFueled!!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colorClasses = service.color === 'blue'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700';
              const borderClasses = service.color === 'blue'
                ? 'border-blue-100 hover:border-blue-300'
                : 'border-green-100 hover:border-green-300';

              return (
                <div
                  key={index}
                  className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${borderClasses}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color === 'blue' ? 'from-blue-900/70' : 'from-green-900/70'} to-transparent`}></div>
                  </div>

                  <div className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${service.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'} rounded-lg mb-4`}>
                      <Icon className={`w-6 h-6 ${service.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>

                    <button className={`px-6 py-2 ${colorClasses} text-white rounded-lg font-medium transition-colors duration-200`}>
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
