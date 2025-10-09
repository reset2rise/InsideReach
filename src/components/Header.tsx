@@ .. @@
 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
-import { Menu, X, Heart } from 'lucide-react';
+import { Menu, X, Heart, ShoppingBag, User } from 'lucide-react';
 import { useAuth } from '../hooks/useAuth';
 import { AuthModal } from './AuthModal';
 
@@ .. @@
           <div className="hidden md:flex items-center space-x-8">
             <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
               Home
             </Link>
-            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">
-              About
-            </a>
-            <a href="#services" className="text-gray-700 hover:text-indigo-600 transition-colors">
-              Services
-            </a>
-            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
-              Contact
-            </a>
+            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center space-x-1">
+              <ShoppingBag className="w-4 h-4" />
+              <span>Products</span>
+            </Link>
           </div>
 
           {/* Auth Section */}
           <div className="flex items-center space-x-4">
             {user ? (
-              <button
-                onClick={signOut}
-                className="text-gray-700 hover:text-indigo-600 transition-colors"
-              >
-                Sign Out
-              </button>
+              <div className="flex items-center space-x-4">
+                <Link
+                  to="/dashboard"
+                  className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center space-x-1"
+                >
+                  <User className="w-4 h-4" />
+                  <span>Dashboard</span>
+                </Link>
+                <button
+                  onClick={signOut}
+                  className="text-gray-700 hover:text-indigo-600 transition-colors"
+                >
+                  Sign Out
+                </button>
+              </div>
             ) : (
               <button
                 onClick={() => setShowAuthModal(true)}
@@ .. @@
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
                 Home
               </Link>
-              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
-                About
-              </a>
-              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
-                Services
-              </a>
-              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
-                Contact
-              </a>
+              <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
+                Products
+              </Link>
               {user ? (
-                <button
-                  onClick={signOut}
-                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
-                >
-                  Sign Out
-                </button>
+                <>
+                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
+                    Dashboard
+                  </Link>
+                  <button
+                    onClick={signOut}
+                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
+                  >
+                    Sign Out
+                  </button>
+                </>
               ) : (
                 <button
                   onClick={() => setShowAuthModal(true)}
                   className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
                 >
                   Sign In
                 </button>
               )}
             </div>
           </div>
         )}
       </nav>
 
       <AuthModal 
         isOpen={showAuthModal} 
         onClose={() => setShowAuthModal(false)} 
       />
     </>
   );
 };