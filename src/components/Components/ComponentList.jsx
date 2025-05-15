import { useComponents } from "../../contexts/ComponentsContext";

const ComponentList = ({ shipId }) => {
  const { components, deleteComponent } = useComponents();
  const filtered = components.filter(c => c.shipId === shipId);

  if (filtered.length === 0) {
    return <p className="text-gray-600">No components for this ship yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {filtered.map(c => (
        <li key={c.id} className="border p-3 rounded bg-white shadow-sm flex justify-between items-start">
          <div>
            <div className="font-semibold text-blue-900">{c.name}</div>
            <div className="text-sm text-gray-600">Serial: {c.serialNumber}</div>
            <div className="text-sm text-gray-600">Installed: {c.installDate}</div>
            <div className="text-sm text-gray-600">Last Maintenance: {c.lastMaintenanceDate}</div>
          </div>
          <button
            onClick={() => deleteComponent(c.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ComponentList;
