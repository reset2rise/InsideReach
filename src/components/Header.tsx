@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { Link } from 'react-router-dom';
+import { Link, useNavigate } from 'react-router-dom';
 import { Menu, X, User, LogOut } from 'lucide-react';
 import { supabase } from '../lib/supabase';
 
@@ .. @@
 export const Header: React.FC = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [user, setUser] = useState<any>(null);
+  const navigate = useNavigate();
 
@@ .. @@
   const handleSignOut = async () => {
     await supabase.auth.signOut();
     setUser(null);
+    navigate('/');
   };
 
@@ .. @@
             <div className="hidden md:flex items-center space-x-8">
               <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
+              <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</Link>
               <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
@@ .. @@
               {user ? (
                 <div className="flex items-center space-x-4">
+                  <Link
+                    to="/account"
+                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
+                  >
+                    <User className="w-4 h-4" />
+                    <span>Account</span>
+                  </Link>
                   <button
@@ .. @@
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
+              <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Products</Link>
               <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</Link>
@@ .. @@
               {user ? (
                 <div className="px-3 py-2 space-y-2">
+                  <Link
+                    to="/account"
+                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
+                  >
+                    <User className="w-4 h-4" />
+                    <span>Account</span>
+                  </Link>
                   <button