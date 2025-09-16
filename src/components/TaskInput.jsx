
"use client";
import React, { useState } from "react";

export default function TaskInput({ addTask }) {
  const [form, setForm] = useState({ name: "", value: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addTask({ name: form.name.trim(), value: form.value });
    setForm({ name: "", value: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        placeholder="Task name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input"
      />
      <input
        placeholder="Value"
        type="number"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
        className="input-short"
      />
      <button type="submit" className="btn">
        Add Task
      </button>
    </form>
  );
}
