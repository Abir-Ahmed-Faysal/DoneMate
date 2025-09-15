"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getFromLocal } from "../../components/SavetoLocal"; // optional helper (keeps compatibility)

// Fixed dashboard component
// Key fixes done:
// 1) Removed the separate `initialData` state and load items into a single `items` state.
// 2) Fixed the broken useEffect `.catch` / typo (setloadnign -> setLoading).
// 3) Made ID/value handling robust (normalize to Number) so `selected.includes(id)` comparisons never fail.
// 4) Added a safe fallback for getFromLocal -> localStorage parsing if helper isn't available.
// 5) Persist items back to localStorage on every change.
// 6) Minor UX improvements: loading state, clearing selections after bulk actions, resetting edit state.

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", value: "" });
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", value: "" });

  const tabs = ["All", "Unpaid", "Deleted"];

 
  const GetFromLocal = async (key) => {
  
      try {
        const res = await getFromLocal(key);
        return res ?? [];
      } catch (e) {
        console.warn("getFromLocal failed, falling back to localStorage", e);
      }
    
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Failed to parse localStorage", e);
      return [];
    }
  };

  // Load items once on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const raw = await GetFromLocal("todos");
        const data = Array.isArray(raw)
          ? raw.map((it) => ({
              id: Number(it?.id) || Date.now(),
              name: it?.name ?? "",
              value: Number(it?.value) || 0,
              date: it?.date ?? new Date().toISOString().slice(0, 10),
              status: it?.status ?? "unpaid",
              read: !!it?.read,
            }))
          : [];

        if (!mounted) return;
        setItems(data);
      } catch (err) {
        console.error("Failed to load todos", err);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Persist items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save todos to localStorage", e);
    }
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!item) return false;
      if (activeTab === "Unpaid" && item.status !== "unpaid") return false;
      if (activeTab === "Deleted" && item.status !== "deleted") return false;
      if (!q) return true;
      return (
        (item.name || "").toLowerCase().includes(q) ||
        String(item.value).toLowerCase().includes(q)
      );
    });
  }, [items, activeTab, query]);

  const toggleSelect = (id) => {
    const nid = Number(id);
    setSelected((prev) => (prev.includes(nid) ? prev.filter((x) => x !== nid) : [...prev, nid]));
  };

  const toggleSelectAll = () => {
    const ids = filtered.map((i) => Number(i.id));
    const allSelected = ids.length > 0 && ids.every((id) => selected.includes(id));
    setSelected(allSelected ? [] : ids);
  };

  const bulkMarkRead = () => {
    setItems((prev) => prev.map((it) => (selected.includes(Number(it.id)) ? { ...it, read: true } : it)));
    setSelected([]);
  };

  const bulkMarkUnpaid = () => {
    setItems((prev) => prev.map((it) => (selected.includes(Number(it.id)) ? { ...it, status: "unpaid" } : it)));
    setSelected([]);
  };

  const bulkDelete = () => {
    setItems((prev) => prev.map((it) => (selected.includes(Number(it.id)) ? { ...it, status: "deleted" } : it)));
    setSelected([]);
  };

  const addItem = (e) => {
    e.preventDefault();
    const name = (newItem.name || "").trim();
    if (!name) return;

    const next = {
      id: Date.now(),
      name,
      value: Number(newItem.value) || 0,
      date: new Date().toISOString().slice(0, 10),
      status: "unpaid",
      read: false,
    };

    setItems((prev) => [next, ...prev]);
    setNewItem({ name: "", value: "" });
    setShowAdd(false);
    setSelected([]);
  };

  const startEdit = (item) => {
    setEditingId(Number(item.id));
    setEditValues({ name: item.name, value: String(item.value) });
  };

  const saveEdit = (id) => {
    setItems((prev) =>
      prev.map((it) => (Number(it.id) === Number(id) ? { ...it, name: (editValues.name || it.name).trim(), value: Number(editValues.value) || 0 } : it))
    );
    setEditingId(null);
    setEditValues({ name: "", value: "" });
  };

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(n) || 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
          <nav className="flex gap-3">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1 rounded-full text-sm ${activeTab === t ? "bg-indigo-600 text-white" : "bg-white border"}`}>
                {t}
              </button>
            ))}
          </nav>
        </header>

        <section className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button onClick={bulkMarkRead} disabled={!selected.length} className="px-3 py-1 rounded shadow-sm bg-white border hover:bg-gray-100 text-sm">
              Mark as read
            </button>
            <button onClick={bulkMarkUnpaid} disabled={!selected.length} className="px-3 py-1 rounded shadow-sm bg-white border hover:bg-gray-100 text-sm">
              Mark as unpaid
            </button>
            <button onClick={() => setShowAdd((v) => !v)} className="px-3 py-1 rounded shadow-sm bg-indigo-600 text-white text-sm">
              Add item
            </button>
            <button onClick={bulkDelete} disabled={!selected.length} className="px-3 py-1 rounded shadow-sm bg-red-50 text-red-600 border text-sm">
              Delete
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input aria-label="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or value" className="px-3 py-2 rounded border bg-white text-sm" />
          </div>
        </section>

        {showAdd && (
          <form onSubmit={addItem} className="mb-4 bg-white p-4 rounded shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
            <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Name" className="px-3 py-2 border rounded" />
            <input value={newItem.value} onChange={(e) => setNewItem({ ...newItem, value: e.target.value })} placeholder="Value" type="number" className="px-3 py-2 border rounded" />
            <div className="flex gap-2">
              <button className="px-3 py-2 rounded bg-indigo-600 text-white" type="submit">
                Add
              </button>
              <button type="button" className="px-3 py-2 rounded border" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
          ) : (
            <>
              {/* Desktop / tablet table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input aria-label="select all" type="checkbox" onChange={toggleSelectAll} checked={filtered.length > 0 && filtered.every((i) => selected.includes(Number(i.id)))} />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">#</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Value</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                          No items found
                        </td>
                      </tr>
                    ) : (
                      filtered.map((item, idx) => (
                        <tr key={item.id} className={`${item.read ? "bg-gray-50" : ""} hover:bg-gray-50`}>
                          <td className="px-4 py-3">
                            <input aria-label={`select ${item.name}`} type="checkbox" checked={selected.includes(Number(item.id))} onChange={() => toggleSelect(item.id)} />
                          </td>
                          <td className="px-4 py-3 text-sm">{idx + 1}</td>
                          <td className="px-4 py-3 text-sm">
                            {editingId === Number(item.id) ? (
                              <input value={editValues.name} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} className="px-2 py-1 border rounded" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                {item.status === "unpaid" && <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">Unpaid</span>}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {editingId === Number(item.id) ? (
                              <input value={editValues.value} onChange={(e) => setEditValues({ ...editValues, value: e.target.value })} className="px-2 py-1 border rounded w-24" />
                            ) : (
                              <span>{formatCurrency(item.value)}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.date}</td>
                          <td className="px-4 py-3 text-sm">
                            {editingId === Number(item.id) ? (
                              <div className="flex gap-2">
                                <button onClick={() => saveEdit(item.id)} className="px-2 py-1 rounded bg-green-600 text-white text-sm">Save</button>
                                <button onClick={() => setEditingId(null)} className="px-2 py-1 rounded border text-sm">Cancel</button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <button onClick={() => startEdit(item)} className="px-2 py-1 rounded border text-sm">Edit</button>
                                <button
                                  onClick={() =>
                                    setItems((prev) =>
                                      prev.map((it) =>
                                        Number(it.id) === Number(item.id)
                                          ? { ...it, status: it.status === "deleted" ? "paid" : "deleted" }
                                          : it
                                      )
                                    )
                                  }
                                  className="px-2 py-1 rounded border text-sm">
                                  {item.status === "deleted" ? "Restore" : "Delete"}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile list fallback */}
              <div className="md:hidden p-4">
                {filtered.length === 0 ? (
                  <div className="text-center text-sm text-gray-500">No items found</div>
                ) : (
                  filtered.map((item) => (
                    <div key={item.id} className="bg-white border rounded p-3 mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-600">{formatCurrency(item.value)}</div>
                          <div className="text-xs text-gray-400">{item.date}</div>
                        </div>
                        <div className="flex gap-2 items-start">
                          <input type="checkbox" checked={selected.includes(Number(item.id))} onChange={() => toggleSelect(item.id)} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
