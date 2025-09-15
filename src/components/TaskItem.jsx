'use client'
import React, { useState } from "react";

export default function TaskItem({ task, index, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: task.name, value: task.value });

  const saveEdit = () => {
    updateTask(task.id, { name: form.name, value: Number(form.value) || 0 });
    setEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">
        {editing ? (
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-2 py-1 border rounded"
          />
        ) : (
          task.name
        )}
      </td>
      <td className="px-4 py-2">
        {editing ? (
          <input
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="px-2 py-1 border rounded w-24"
          />
        ) : (
          `$${task.value}`
        )}
      </td>
      <td className="px-4 py-2">{task.date}</td>
      <td className="px-4 py-2 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={saveEdit}
              className="px-2 py-1 rounded bg-green-600 text-white text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-2 py-1 rounded border text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-2 py-1 rounded border text-sm"
            >
              Edit
            </button>
            <button
              onClick={() =>
                updateTask(task.id, {
                  status: task.status === "deleted" ? "paid" : "deleted",
                })
              }
              className="px-2 py-1 rounded border text-sm"
            >
              {task.status === "deleted" ? "Restore" : "Delete"}
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
