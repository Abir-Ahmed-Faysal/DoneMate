"use client";

// Create / Add
export const addToLocal = (key, newObject) => {
  try {
    const oldData = localStorage.getItem(key);
    let updatedData = [];

    if (oldData) {
      const parsedOldData = JSON.parse(oldData);
      updatedData = Array.isArray(parsedOldData)
        ? [...parsedOldData, newObject]
        : [parsedOldData, newObject];
    } else {
      updatedData = [newObject];
    }

    localStorage.setItem(key, JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    console.error("Error saving to localStorage", error);
    return null;
  }
};

// Get
export const getFromLocal = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from localStorage", error);
    return null;
  }
};


export const deleteFromLocal = (key, id) => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data);
      const filteredData = parsedData.filter(
        (singleData) => singleData.id !== id
      );
      localStorage.setItem(key, JSON.stringify(filteredData));
      return filteredData;
    }
    return null;
  } catch (error) {
    console.error("Error deleting data from localStorage", error);
    return null;
  }
};


export const updateLocal = (key, newData) => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data);
      const updatedArray = parsedData.map((singleData) =>
        singleData.id === newData.id ? newData : singleData
      );

      localStorage.setItem(key, JSON.stringify(updatedArray));
      return updatedArray;
    }
    return null;
  } catch (error) {
    console.error("Error updating data in localStorage", error);
    return null;
  }
};
