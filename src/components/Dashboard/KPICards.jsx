import { useShips } from "../../contexts/ShipsContext";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import dayjs from "dayjs";

const KPICards = () => {
  const { ships } = useShips();
  const { jobs } = useJobs();
  const { components } = useComponents();

  const completedJobs = jobs.filter((j) => j.status === "Completed").length;
  const inProgressJobs = jobs.filter((j) => j.status === "In Progress").length;

  const overdueComponents = components.filter((c) =>
    dayjs(c.lastMaintenanceDate).isBefore(dayjs().subtract(6, "months"))
  ).length;

  const cards = [
    { label: "Total Ships", value: ships.length },
    { label: "Overdue Components", value: overdueComponents },
    { label: "Jobs In Progress", value: inProgressJobs },
    { label: "Jobs Completed", value: completedJobs }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-600">{card.label}</p>
          <h2 className="text-2xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
