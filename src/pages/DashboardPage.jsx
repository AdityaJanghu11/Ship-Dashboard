import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";

const DashboardPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>
      <KPICards />
      <Charts /> {/* 👈 Add this */}
    </div>
  );
};

export default DashboardPage;
