// src/pages/HomePage.jsx
// Public landing page

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Hero */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
          <span className="text-blue-400 text-sm font-medium">🤖 AI-Powered Platform</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Smart Complaint<br />
          <span className="text-blue-400">Management System</span>
        </h1>
        <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
          Submit complaints, track their status, and get instant AI-powered analysis with department routing and priority detection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-base px-8 py-3">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-primary text-base px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3">
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          {[
            { icon: "📝", title: "Easy Submission", desc: "Submit complaints with a simple form in seconds" },
            { icon: "🤖", title: "AI Analysis", desc: "Automatic priority detection and department routing" },
            { icon: "📊", title: "Live Tracking", desc: "Track your complaint status in real-time" },
          ].map((f) => (
            <div key={f.title} className="card text-left">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-display font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
