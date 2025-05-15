import { createContext, useContext, useState, useEffect } from "react";

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("ships");
    if (stored) setShips(JSON.parse(stored));
    else setShips([
      {
        id: "s1",
        name: "Ever Given",
        imo: "9811000",
        flag: "Panama",
        status: "Active"
      },
      {
        id: "s2",
        name: "Maersk Alabama",
        imo: "9164263",
        flag: "USA",
        status: "Under Maintenance"
      }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);

  const addShip = (ship) => {
    setShips([...ships, { ...ship, id: crypto.randomUUID() }]);
  };

  const updateShip = (id, updated) => {
    setShips(ships.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteShip = (id) => {
    setShips(ships.filter(s => s.id !== id));
  };

  const getShip = (id) => {
    return ships.find(s => s.id === id);
  };

  return (
    <ShipsContext.Provider
      value={{ ships, addShip, updateShip, deleteShip, getShip }}
    >
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
