import { createContext, useContext, useState, useEffect } from "react";

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("components");
    if (stored) setComponents(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const addComponent = (component) => {
    setComponents((prev) => [...prev, { ...component, id: crypto.randomUUID() }]);
  };

  const updateComponent = (id, updated) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);
