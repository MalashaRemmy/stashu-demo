import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      title: "Smart Budgeting",
      description: "AI-powered insights to help you manage your money like a pro",
      icon: "💰",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Goal Tracking",
      description: "Set and achieve your financial goals with personalized plans",
      icon: "🎯",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Meal Planning",
      description: "Save money on food with smart meal planning and budget tracking",
      icon: "🍽️",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Student Tools",
      description: "Scholarship tracker, shared expenses, and financial literacy",
      icon: "🎓",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { label: "Students Helped", value: "10,000+" },
    { label: "Money Saved", value: "$2.5M+" },
    { label: "Goals Achieved", value: "85%" },
    { label: "App Rating", value: "4.9/5" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Where Your Money
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Makes Sense</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate financial planning app for university students. Track expenses, set goals, 
            and build healthy money habits that last a lifetime.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-blue-600 font-semibold">Welcome back, {user?.name}! 👋</p>
              <Link 
                to="/dashboard" 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/auth" 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link 
                to="/auth" 
                className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Built specifically for student life and financial success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already building better financial futures
          </p>
          {!isAuthenticated && (
            <Link 
              to="/auth" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}