import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);


  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email  ,name}),
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus('Subscription successful!');
        console.log(data);
      } else {
        const errorData = await response.json();
        setSubscriptionStatus(`Subscription failed: ${errorData.message}`);
      }
    } catch (error) {
      setSubscriptionStatus('Network error during subscription');
      console.error('Error during subscription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Informed with the Latest News</h1>
            <p className="text-xl mb-8">Your trusted source for breaking news, in-depth analysis, and expert perspectives</p>
            <div className="flex justify-center">
              <Link to="/categories" className="bg-white text-blue-800 font-bold py-3 px-6 rounded-lg mr-4 hover:bg-blue-100 transition-colors">
                Browse Categories
              </Link>
              <Link to="/trending" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors">
                Trending Now
              </Link>
            </div>
          </div>
        </div>
      </section>

    

    

      {/* Subscribe Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Stay updated with our latest news and special updates delivered directly to your inbox.</p>
            
            {isSubscribed ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="font-medium">Thank you for subscribing!</p>
                <p>You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 md:space-y-0 md:flex md:gap-4 justify-center">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full md:w-auto flex-grow rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full md:w-auto flex-grow rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
}