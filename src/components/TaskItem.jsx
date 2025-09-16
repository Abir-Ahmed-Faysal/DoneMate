// src/components/TaskItem.jsx
"use client";
import React, { useState } from "react";

export default function TaskItem({
  task,
  index,
  onToggleComplete,
  onDelete,
  onUpdate,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: task.name, value: task.value });

  const saveEdit = () => {
    if (!form.name.trim()) return;
    onUpdate(task.id, { name: form.name.trim(), value: Number(form.value) || 0 });
    setEditing(false);
  };

  const isCompleted = task.status === "completed";

  return (
    <tr className={isCompleted ? "row-completed" : ""}>
      <td>{index + 1}</td>
      <td>
        <label className="flex-row">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          />
          {editing ? (
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            <span className="task-name">{task.name}</span>
          )}
        </label>
      </td>
      <td>
        {editing ? (
          <input
            value={form.value}
            type="number"
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="value-input"
          />
        ) : (
          `$${task.value}`
        )}
      </td>
      <td>{task.date}</td>
      <td className="actions">
        {editing ? (
          <>
            <button onClick={saveEdit} className="btn small">
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setForm({ name: task.name, value: task.value });
              }}
              className="btn small ghost"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditing(true);
                setForm({ name: task.name, value: task.value });
              }}
              className="btn small"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="btn small danger"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
