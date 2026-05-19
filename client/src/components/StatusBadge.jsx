// src/components/StatusBadge.jsx
// Reusable colored status indicator

const StatusBadge = ({ status }) => {
  const map = {
    Pending: "badge-pending",
    "In Progress": "badge-progress",
    Resolved: "badge-resolved",
    Rejected: "badge-rejected",
  };
  return <span className={map[status] || "badge-pending"}>{status}</span>;
};

export default StatusBadge;
