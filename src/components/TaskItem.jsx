"use client";
import React from "react";

export default function TaskItem({
  task,
  index,
  isSelected,
  onToggleSelect,
  onDelete,
}) {
  const isCompleted = task.status === "complete";

  return (
    <tr className={isCompleted ? "row-completed" : ""}>
      <td>
        <input
          type="checkbox"
          checked={!!isSelected}
          onChange={() => onToggleSelect(task.id)}
          aria-label={`Select task ${task.name}`}
        />
      </td>
      <td>{index + 1}</td>
      <td>
        <span className={`task-name ${isCompleted ? "done" : ""}`}>
          {task.name}
        </span>
      </td>
      <td>
        <span className={`badge ${isCompleted ? "completed" : "pending"}`}>
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </td>
      <td>{task.date}</td>
      <td className="actions">
        <button onClick={() => onDelete(task.id)} className="btn small danger">
          Delete
        </button>
      </td>
    </tr>
  );
}
