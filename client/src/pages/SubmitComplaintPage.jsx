// src/pages/SubmitComplaintPage.jsx
// Complaint registration form with AI analysis

import { useState } from "react";
import { createComplaint, analyzeWithAI } from "../services/api";
import AIAnalysisCard from "../components/AIAnalysisCard";
import toast from "react-hot-toast";

const CATEGORIES = ["Water Supply", "Electricity", "Garbage", "Roads", "Sanitation", "Other"];

const SubmitComplaintPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", title: "", description: "", category: "", location: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createComplaint(form);
      toast.success("Complaint submitted successfully!");
      setSubmitted(true);

      // Trigger AI analysis after submission
      setAiLoading(true);
      try {
        const { data } = await analyzeWithAI(form);
        setAiAnalysis(data.analysis);
      } catch {
        toast.error("AI analysis unavailable, but complaint was saved.");
      } finally {
        setAiLoading(false);
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((e) => toast.error(e.msg));
      } else {
        toast.error(err.response?.data?.message || "Submission failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", title: "", description: "", category: "", location: "" });
    setAiAnalysis(null);
    setSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-white">Submit a Complaint</h1>
        <p className="text-slate-400 mt-1">Fill in the details below. AI will analyze your complaint automatically.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
              <input name="name" className="input-field" placeholder="Rahul Kumar" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address *</label>
              <input type="email" name="email" className="input-field" placeholder="rahul@gmail.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Complaint Title *</label>
            <input name="title" className="input-field" placeholder="e.g. Water Leakage Issue" value={form.title} onChange={handleChange} required />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
            <textarea name="description" rows={4} className="input-field resize-none" placeholder="Describe your complaint in detail..." value={form.description} onChange={handleChange} required />
          </div>

          {/* Row 2: Category + Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category *</label>
              <select name="category" className="input-field" value={form.category} onChange={handleChange} required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Location *</label>
              <input name="location" className="input-field" placeholder="e.g. Ghaziabad" value={form.location} onChange={handleChange} required />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1" disabled={loading || submitted}>
              {loading ? "Submitting..." : submitted ? "Submitted ✓" : "Submit Complaint"}
            </button>
            {submitted && (
              <button type="button" onClick={handleReset} className="btn-secondary">
                New Complaint
              </button>
            )}
          </div>
        </form>

        {/* AI Analysis Section */}
        {aiLoading && (
          <div className="mt-6 flex items-center gap-3 bg-blue-950/30 border border-blue-500/20 rounded-xl p-4">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-300 text-sm">🤖 AI is analyzing your complaint...</p>
          </div>
        )}
        {aiAnalysis && <AIAnalysisCard analysis={aiAnalysis} />}
      </div>
    </div>
  );
};

export default SubmitComplaintPage;
