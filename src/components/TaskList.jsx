"use client";
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks = [],
  loading,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
  onMarkSelectedComplete,
  onDelete,
}) {
  if (!loading && tasks.length === 0) {
    return <div className="empty">No tasks found</div>;
  }

  const allSelected = tasks.length > 0 && selectedIds.length === tasks.length;

  return (
    <div className="table-wrap">
      <div className="table-toolbar">
        <div>
          <button
            className="btn"
            onClick={onMarkSelectedComplete}
            disabled={selectedIds.length === 0}
          >
            Mark as Complete
          </button>
          <span style={{ marginLeft: 10, color: "var(--muted)" }}>
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : ""}
          </span>
        </div>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                aria-label="Select all visible tasks"
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="center">
                Loading...
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <TaskItem
                key={task.id}
                task={task}
                index={idx}
                isSelected={selectedIds.includes(task.id)}
                onToggleSelect={onToggleSelect}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
