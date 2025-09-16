"use client";
import React, { useState } from "react";

export default function TaskInput({ addTask }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Task title is required");
      return;
    }
    addTask({ name: name.trim() });
    setName("");
    setError("");
    setVisible(false);
  };

  return (
    <div>
      {!visible ? (
        <div className="task-input-form">
          <button className="btn" onClick={() => setVisible(true)}>
            Add Task
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="task-input-form">
          <input
            placeholder="Task title (required)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            aria-label="Task title"
            required
          />
          <button type="submit" className="btn">
            Add
          </button>
          <button
            type="button"
            className="btn small ghost"
            onClick={() => {
              setVisible(false);
              setName("");
              setError("");
            }}
          >
            Cancel
          </button>
        </form>
      )}
      {error && <div style={{ color: "#b91c1c", marginTop: 6 }}>{error}</div>}
    </div>
  );
}
