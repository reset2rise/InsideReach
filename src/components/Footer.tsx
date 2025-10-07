export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="/Inside Reach Ministries logo.png"
                alt="Inside Reach Ministries Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Inside Reach Ministries. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                A 501(c)(3) nonprofit organization
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering families to thrive through faith, support, and community connection
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
