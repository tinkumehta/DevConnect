import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 text-center border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Compact Social Icons */}
        <div className='flex gap-4 justify-center mb-3'>
            <a 
              href="https://www.instagram.com/___tinkukumar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gradient-to-br hover:from-pink-600 hover:via-purple-600 hover:to-orange-500 transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            
            <a 
              href="https://x.com/TinkuKu22071421?t=EC0SbGq40OclU23Kh3SqSw&s=09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-black transition-all duration-200"
              aria-label="Twitter"
            >
              <FaSquareXTwitter className="text-lg" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/tinkumehta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            
            <a 
              href="https://github.com/tinkumehta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-900 transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
        </div>
        
        {/* Compact Copyright Text */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}