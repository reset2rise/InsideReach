export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-6 py-10 md:py-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img
              src="/Inside Reach Ministries logo.png"
              alt="Inside Reach Ministries Logo"
              className="w-full max-w-md h-auto"
              style={{imageRendering: '-webkit-optimize-contrast', WebkitFontSmoothing: 'antialiased'}}
            />
          </div>

          <p className="text-2xl md:text-3xl font-bold text-blue-700 mb-10 leading-relaxed -mt-10">
            "Changing the world...One Person, One Family, One Business, One Community at a time."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Learn More
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-gray-200 hover:border-teal-300">
              Get Involved
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
