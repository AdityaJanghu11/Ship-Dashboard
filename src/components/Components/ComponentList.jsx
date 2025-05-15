import { useComponents } from "../../contexts/ComponentsContext";

const ComponentList = ({ shipId }) => {
  const { components, deleteComponent } = useComponents();
  const filtered = components.filter(c => c.shipId === shipId);

  return (
    <div className="p-4 border rounded bg-white">
      <ul className="space-y-2">
        {filtered.map(c => (
          <li key={c.id} className="p-2 border rounded">
            <div><strong>{c.name}</strong> – {c.serialNumber}</div>
            <div>Installed: {c.installDate}</div>
            <div>Last Maintenance: {c.lastMaintenanceDate}</div>
            <button
              onClick={() => deleteComponent(c.id)}
              className="text-red-500 text-sm mt-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
