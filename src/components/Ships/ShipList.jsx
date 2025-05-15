import { useShips } from "../../contexts/ShipsContext";
import { Link } from "react-router-dom";

const ShipList = () => {
  const { ships, deleteShip } = useShips();

  if (ships.length === 0) {
    return <p className="text-gray-600">No ships added yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {ships.map((ship) => (
        <li
          key={ship.id}
          className="border p-3 rounded bg-white shadow-sm flex justify-between items-start"
        >
          <div>
            <Link
              to={`/ships/${ship.id}`}
              className="font-semibold text-blue-800 hover:underline"
            >
              {ship.name}
            </Link>
            <div className="text-sm text-gray-600">IMO: {ship.imo}</div>
            <div className="text-sm text-gray-600">Flag: {ship.flag}</div>
            <div className="text-sm text-gray-600">Status: {ship.status}</div>
          </div>
          <button
            onClick={() => deleteShip(ship.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ShipList;
