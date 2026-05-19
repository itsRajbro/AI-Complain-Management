// src/components/AIAnalysisCard.jsx
// Displays AI-generated complaint analysis results

const priorityColors = {
  Low: "text-green-400 bg-green-500/10 border-green-500/30",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  High: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  Critical: "text-red-400 bg-red-500/10 border-red-500/30",
};

const AIAnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  const { priority, department, autoResponse, summary } = analysis;

  return (
    <div className="card border-blue-500/30 bg-blue-950/20 mt-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-xs">🤖</span>
        </div>
        <h3 className="font-display font-bold text-white">AI Analysis Result</h3>
      </div>

      {/* Priority & Department */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Priority</p>
          <span
            className={`text-sm font-bold border px-2 py-1 rounded-full ${
              priorityColors[priority] || priorityColors.Medium
            }`}
          >
            {priority}
          </span>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Department</p>
          <p className="text-sm font-semibold text-blue-300">{department}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">AI Summary</p>
        <p className="text-sm text-slate-300">{summary}</p>
      </div>

      {/* Auto Response */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
          Auto-Generated Response
        </p>
        <p className="text-sm text-slate-300 italic">"{autoResponse}"</p>
      </div>
    </div>
  );
};

export default AIAnalysisCard;
