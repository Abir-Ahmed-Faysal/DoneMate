"use client";
import React, { useEffect, useState, useMemo } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import {
  getFromLocal,
  addToLocal,
  updateInLocal,
  deleteFromLocal,
  saveToLocal,
} from "../utilities/SavetoLocal.js";
import "../style.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);

  const tabs = ["All", "Pending", "Completed"];

  useEffect(() => {
    setLoading(true);
    const stored = getFromLocal("todos");
    setItems(stored);
    setLoading(false);
  }, []);

  const addTask = ({ name }) => {
    const newTask = {
      id: Date.now(),
      name,
      status: "pending",
      date: new Date().toLocaleString(),
    };
    const updated = addToLocal("todos", newTask);
    setItems(updated);
  };

  const updateTask = (id, updates) => {
    const updatedArray = items.map((it) =>
      it.id === id ? { ...it, ...updates } : it
    );
    setItems(updatedArray);
    updateInLocal("todos", { id, ...updates });
  };

  const deleteTask = (id) => {
    const updated = deleteFromLocal("todos", id);
    setItems(updated);
    setSelectedIds((prev) => prev.filter((pid) => pid !== id));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeTab === "Pending" && item.status !== "pending") return false;
      if (activeTab === "Completed" && item.status !== "complete") return false;
      if (!q) return true;
      return item.name && item.name.toLowerCase().includes(q);
    });
  }, [items, activeTab, query]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = (checked) => {
    if (checked) {
      setSelectedIds(filtered.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const markSelectedComplete = () => {
    if (!selectedIds || selectedIds.length === 0) return;
    const now = new Date().toLocaleString();
    const updated = items.map((it) =>
      selectedIds.includes(it.id)
        ? { ...it, status: "complete", date: now }
        : it
    );
    setItems(updated);
    saveToLocal("todos", updated);
    setSelectedIds([]);
  };

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
      </div>

      <TaskList
        loading={loading}
        tasks={filtered}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onSelectAll={selectAll}
        onMarkSelectedComplete={markSelectedComplete}
        onDelete={deleteTask}
      />
    </div>
  );
}
