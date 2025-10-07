export default function CallToAction() {
  const actions = [
    {
      title: 'Partner',
      description: 'Join us in building stronger families and communities',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Donate',
      description: 'Your generosity makes transformation possible',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Volunteer',
      description: 'Give your time and talents to make a difference',
      gradient: 'from-blue-600 to-blue-700'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="People sitting at table"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Will you take a seat at the table with us?
            </h2>
            <p className="text-2xl text-blue-700 font-semibold">
              You can...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {actions.map((action, index) => (
              <div
                key={index}
                className="group"
              >
                <button
                  className={`w-full px-10 py-16 bg-gradient-to-br ${action.gradient} text-white rounded-2xl font-bold text-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105`}
                >
                  {action.title}
                </button>
                <p className="text-center text-gray-700 mt-4 text-lg">
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
