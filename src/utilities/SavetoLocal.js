// Get items from localStorage
export const getFromLocal = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting data:", error);
    return [];
  }
};

// Save items array to localStorage
export const saveToLocal = (key, items) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return items;
  } catch (error) {
    console.error("Error saving data:", error);
    return null;
  }
};

// Add a new item to localStorage array
export const addToLocal = (key, newObject) => {
  const items = getFromLocal(key);
  const updated = [...items, newObject];
  return saveToLocal(key, updated);
};

// Delete an item from localStorage array by id
export const deleteFromLocal = (key, id) => {
  const items = getFromLocal(key);
  const updated = items.filter((item) => item.id !== id);
  return saveToLocal(key, updated);
};

// Update an existing item in localStorage array by id (single item)
export const updateInLocal = (key, updatedObject) => {
  const items = getFromLocal(key);
  const updated = items.map((item) =>
    item.id === updatedObject.id ? { ...item, ...updatedObject } : item
  );
  return saveToLocal(key, updated);
};
