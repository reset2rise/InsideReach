@@ .. @@
 import React from 'react';
-import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';
+import { Link } from 'react-router-dom';
+import { ArrowRight, Heart, Users, BookOpen, ShoppingBag } from 'lucide-react';
 
@@ .. @@
           <div className="text-center">
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
               Transform Your Life with
               <span className="block text-yellow-300">Inside Reach Ministries</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
               Empowering individuals, couples, and families to reach their full potential through faith-based coaching, resources, and community support.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
-              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
+              <Link
+                to="/products"
+                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
+              >
+                <ShoppingBag className="w-5 h-5" />
+                <span>Explore Programs</span>
+              </Link>
+              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                 <span>Get Started Today</span>
                 <ArrowRight className="w-5 h-5" />
-              </button>
-              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
-                Learn More
               </button>
             </div>
           </div>