import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";
import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
   <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="text-center font-semibold text-xl">ENTNT Dashboard Loaded!</div>
    </motion.div>
  );
};

export default DashboardPage;

