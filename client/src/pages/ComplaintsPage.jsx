// src/pages/ComplaintsPage.jsx
// Full complaint list with search, filter, update status, delete

import { useState, useEffect } from "react";
import {
  getComplaints,
  deleteComplaint,
  updateComplaint,
  searchComplaints,
} from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const CATEGORIES = ["All", "Water Supply", "Electricity", "Garbage", "Roads", "Sanitation", "Other"];
const STATUSES = ["Pending", "In Progress", "Resolved", "Rejected"];

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchLoc, setSearchLoc] = useState("");
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== "All") params.category = category;
      const { data } = await getComplaints(params);
      setComplaints(data);
    } catch (err) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLoc.trim()) return fetchComplaints();
    setLoading(true);
    try {
      const { data } = await searchComplaints(searchLoc);
      setComplaints(data);
    } catch {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      await deleteComplaint(id);
      toast.success("Complaint removed");
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      const { data } = await updateComplaint(id, { status: editStatus });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? data.complaint : c))
      );
      toast.success("Status updated");
      setEditId(null);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold text-white mb-6">All Complaints</h1>

      {/* Search + Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Location Search */}
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <input
              className="input-field"
              placeholder="Search by location (e.g. Ghaziabad)"
              value={searchLoc}
              onChange={(e) => setSearchLoc(e.target.value)}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">Search</button>
            {searchLoc && (
              <button type="button" onClick={() => { setSearchLoc(""); fetchComplaints(); }} className="btn-secondary">
                Clear
              </button>
            )}
          </form>

          {/* Category Filter */}
          <select
            className="input-field sm:w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader text="Loading complaints..." /></div>
      ) : complaints.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-slate-400 text-lg">No complaints found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c._id} className="card hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-white truncate">{c.title}</h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-1 mb-1">{c.description}</p>
                  <div className="flex gap-3 text-xs text-slate-500 flex-wrap">
                    <span>👤 {c.name}</span>
                    <span>📍 {c.location}</span>
                    <span>🏷️ {c.category}</span>
                    <span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {editId === c._id ? (
                    <>
                      <select
                        className="input-field py-1.5 text-sm w-36"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => handleStatusUpdate(c._id)}
                        className="btn-primary py-1.5 text-sm"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditId(null)} className="btn-secondary py-1.5 text-sm">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditId(c._id); setEditStatus(c.status); }}
                        className="btn-secondary py-1.5 text-sm"
                      >
                        Edit Status
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="btn-danger py-1.5 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;
