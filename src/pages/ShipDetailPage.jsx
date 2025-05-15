import { useParams } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import ComponentForm from "../components/Components/ComponentForm";
import ComponentList from "../components/Components/ComponentList";
import JobList from "../components/Jobs/JobList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const { getShip } = useShips();
  const ship = getShip(id);

  if (!ship) return <div className="container">Ship not found.</div>;

  return (
    <div className="container">
      <h1 className="page-title">{ship.name}</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header">General Info</div>
          <p><strong>IMO:</strong> {ship.imo}</p>
          <p><strong>Flag:</strong> {ship.flag}</p>
          <p><strong>Status:</strong> {ship.status}</p>
        </div>

        <div className="card">
          <div className="card-header">Add Component</div>
          <ComponentForm shipId={id} />
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">Ship Components</div>
        <ComponentList shipId={id} />
      </div>

      <div className="card">
        <div className="card-header">Maintenance Jobs</div>
        <JobList shipId={id} />
      </div>
    </div>
  );
};

export default ShipDetailPage;
