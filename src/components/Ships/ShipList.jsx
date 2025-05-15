import { useShips } from "../../contexts/ShipsContext";
import { Link } from "react-router-dom";

const ShipList = () => {
  const { ships, deleteShip } = useShips();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">All Ships</h2>
      <ul className="space-y-2">
        {ships.map((ship) => (
          <li key={ship.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <strong>{ship.name}</strong> – {ship.imo} | {ship.flag} | {ship.status}
            </div>
            <div className="space-x-2">
              <Link to={`/ships/${ship.id}`} className="text-blue-600 text-sm">View</Link>
              <button
                className="text-red-500 text-sm"
                onClick={() => deleteShip(ship.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipList;
