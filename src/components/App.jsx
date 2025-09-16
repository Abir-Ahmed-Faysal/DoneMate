// src/App.jsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import TaskList from "./TaskList";
import {
  getFromLocal,
  addToLocal,
  updateInLocal,
  deleteFromLocal,
  saveToLocal,
} from "../utilities/SavetoLocal.js";
import "../style.css";
import TaskInput from "./TaskInput";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Pending", "Completed"];

  useEffect(() => {
    setLoading(true);
    const stored = getFromLocal("todos");
    setItems(stored);
    setLoading(false);
  }, []);

  // Add a new task and persist
  const addTask = ({ name, value }) => {
    const newTask = {
      id: Date.now(),
      name,
      value: Number(value) || 0,
      status: "pending",
      date: new Date().toLocaleString(),
    };
    const updated = addToLocal("todos", newTask);
    setItems(updated);
  };

  // Update an existing task (partial updates allowed)
  const updateTask = (id, updates) => {
    const updatedArray = items.map((it) =>
      it.id === id ? { ...it, ...updates } : it
    );
    setItems(updatedArray);
    updateInLocal("todos", { id, ...updates });
  };

  // Delete task completely
  const deleteTask = (id) => {
    const updated = deleteFromLocal("todos", id);
    setItems(updated);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeTab === "Pending" && item.status !== "pending") return false;
      if (activeTab === "Completed" && item.status !== "completed")
        return false;
      if (!q) return true;
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        String(item.value).toLowerCase().includes(q)
      );
    });
  }, [items, activeTab, query]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Dashboard</h1>
        <nav className="tabs">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`tab ${activeTab === t ? "tab-active" : ""}`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <TaskInput addTask={addTask} />

      <div className="search-row">
        <input
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {
            setItems([]);
            saveToLocal("todos", []);
          }}
          className="clear-btn"
          title="Clear all tasks (localStorage)"
        >
          Clear All
        </button>
      </div>

      <TaskList
        loading={loading}
        tasks={filtered}
        onToggleComplete={(id, isComplete) =>
          updateTask(id, { status: isComplete ? "completed" : "pending" })
        }
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </div>
  );
}
