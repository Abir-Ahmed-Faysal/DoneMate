'use client'
import React, { useState } from "react";

export default function TaskInput({ addTask }) {
  const [form, setForm] = useState({ name: "", value: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addTask({ name: form.name.trim(), value: Number(form.value) || 0 });
    setForm({ name: "", value: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-white p-4 rounded shadow-sm flex gap-2"
    >
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="px-3 py-2 border rounded flex-1"
      />
      <input
        placeholder="Value"
        type="number"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
        className="px-3 py-2 border rounded w-32"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-indigo-600 text-white"
      >
        Add
      </button>
    </form>
  );
}
