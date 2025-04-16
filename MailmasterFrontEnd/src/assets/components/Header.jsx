import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({authState , setAuth}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use the token stored in localStorage
        },
      });

      if (response.ok) {
        
        localStorage.removeItem('token');
        setAuth(false);  
        console.log('Logged out successfully');
      } else {
        console.error('Error during logout');
      }
    } catch (error) {
      console.error('Network error during logout', error);
    }
  };

  

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold">📧 Mailmaster</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="px-3 py-2 rounded hover:bg-blue-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Dash" className="px-3 py-2 rounded hover:bg-blue-800 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
            {!authState && 
        <Link 
          to="/login" 
          className="block px-3 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      }

     
      {authState && 
        <button 
          onClick={() => setAuth(false)} 
          className="mt-2 px-4 py-2 bg-red-500 rounded text-white"
        >
          Logout
        </button>
      }
            </li>
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-800">
          <ul className="flex flex-col px-4 pt-2 pb-3 space-y-2">
            <li>
              <Link to="/" className="block px-3 py-2 rounded hover:bg-blue-700 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Dash" className="block px-3 py-2 rounded hover:bg-blue-700 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>


            {!authState && 
        <Link 
          to="/login" 
          className="block px-3 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      }

     
      {authState && 
        <button
        
         

          onClick={() => handleLogout()} 
          className="block px-3 py-2 bg-red-500 rounded text-white"
        >
          Logout
        </button>
      }
             
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

