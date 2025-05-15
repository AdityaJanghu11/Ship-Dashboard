import { useParams } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import ComponentList from "../components/Components/ComponentList";
import ComponentForm from "../components/Components/ComponentForm";
import JobList from "../components/Jobs/JobList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const { getShip } = useShips();
  const ship = getShip(id);

  if (!ship) return <p className="p-4">Ship not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ship: {ship.name}</h1>
      <div className="mb-6">
        <p><strong>IMO:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Components</h2>
        <ComponentForm shipId={id} />
        <ComponentList shipId={id} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Maintenance Jobs</h2>
        <JobList shipId={id} />
      </div>
    </div>
  );
};

export default ShipDetailPage;
