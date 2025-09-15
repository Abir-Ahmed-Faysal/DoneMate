"use client";
import React, { useState, useEffect, useMemo } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { addToLocal, getFromLocal } from "./SavetoLocal";

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Unpaid", "Deleted"];

  
  useEffect(() => {
    try {
      const raw = getFromLocal("todos");
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);



  // Persist tasks to localStorage
  useEffect(() => {
   addToLocal("todos", JSON.stringify(items));
  }, [items]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      date: new Date().toISOString().slice(0, 10),
      status: "unpaid",
      read: false,
    };
    setItems([newTask, ...items]);
  };

  const updateTask = (id, updates) => {
    setItems(items.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => {
      if (activeTab === "Unpaid" && item.status !== "unpaid") return false;
      if (activeTab === "Deleted" && item.status !== "deleted") return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        String(item.value).toLowerCase().includes(q)
      );
    });
  }, [items, activeTab, query]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Task Dashboard</h1>
        <nav className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTab === t ? "bg-indigo-600 text-white" : "bg-white border"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <TaskInput addTask={addTask} />

      <div className="mb-4">
        <input
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border rounded w-full"
        />
      </div>

      <TaskList tasks={filtered} updateTask={updateTask} />
    </div>
  );
}
