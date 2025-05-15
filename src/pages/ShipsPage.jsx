import ShipForm from "../components/Ships/ShipForm";
import ShipList from "../components/Ships/ShipList";

const ShipsPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Ships Management</h1>

      <div className="card mb-6">
        <div className="card-header">Add New Ship</div>
        <ShipForm />
      </div>

      <div className="card">
        <div className="card-header">All Ships</div>
        <ShipList />
      </div>
    </div>
  );
};

export default ShipsPage;
