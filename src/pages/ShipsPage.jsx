import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
;

const ShipsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ships Management</h1>
      <ShipForm />
      <ShipList />
    </div>
  );
};

export default ShipsPage;
