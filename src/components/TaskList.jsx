// src/components/TaskList.jsx
"use client";
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks = [],
  loading,
  onToggleComplete,
  onDelete,
  onUpdate,
}) {
  if (!loading && tasks.length === 0) {
    return <div className="empty">No tasks found</div>;
  }

  return (
    <div className="table-wrap">
      <table className="task-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="center">
                Loading...
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <TaskItem
                key={task.id}
                task={task}
                index={idx}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
