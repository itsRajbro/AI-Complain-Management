// src/pages/DashboardPage.jsx
// Main dashboard with summary cards

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getComplaints } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";

const StatCard = ({ label, value, color, icon }) => (
  <div className="card flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="font-display text-3xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const counts = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader text="Loading dashboard..." /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-slate-400 mt-1">Here's an overview of all complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={counts.total} color="bg-blue-500/20" icon="📋" />
        <StatCard label="Pending" value={counts.pending} color="bg-yellow-500/20" icon="⏳" />
        <StatCard label="In Progress" value={counts.inProgress} color="bg-blue-500/20" icon="🔄" />
        <StatCard label="Resolved" value={counts.resolved} color="bg-green-500/20" icon="✅" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Link to="/submit" className="card hover:border-blue-500/50 transition-colors group">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                Submit New Complaint
              </h3>
              <p className="text-sm text-slate-400">Register a new complaint with AI analysis</p>
            </div>
          </div>
        </Link>
        <Link to="/complaints" className="card hover:border-blue-500/50 transition-colors group">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                View All Complaints
              </h3>
              <p className="text-sm text-slate-400">Filter, search and manage complaints</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Complaints */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-white text-lg">Recent Complaints</h2>
          <Link to="/complaints" className="text-sm text-blue-400 hover:text-blue-300">
            View all →
          </Link>
        </div>
        {complaints.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No complaints yet</p>
        ) : (
          <div className="space-y-3">
            {complaints.slice(0, 5).map((c) => (
              <div key={c._id} className="flex items-center justify-between bg-slate-800 rounded-lg px-4 py-3">
                <div>
                  <p className="font-medium text-white text-sm">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.location} · {c.category}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
