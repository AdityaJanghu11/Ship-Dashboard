import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import dayjs from "dayjs";
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Charts = () => {
  const { jobs } = useJobs();
  const { components } = useComponents();

  // Job Status Pie Chart Data
  const jobData = [
    { name: "Open", value: jobs.filter((j) => j.status === "Open").length },
    { name: "In Progress", value: jobs.filter((j) => j.status === "In Progress").length },
    { name: "Completed", value: jobs.filter((j) => j.status === "Completed").length }
  ];

  // Component Maintenance Bar Chart Data
  const overdueCount = components.filter((c) =>
    dayjs(c.lastMaintenanceDate).isBefore(dayjs().subtract(6, "months"))
  ).length;

  const healthyCount = components.length - overdueCount;

  const componentData = [
    { name: "Healthy", value: healthyCount },
    { name: "Overdue", value: overdueCount }
  ];
  const exportKPItoCSV = () => {
  const rows = [
    ["Metric", "Value"],
    ["Total Jobs", jobs.length],
    ["Jobs Open", jobData[0].value],
    ["Jobs In Progress", jobData[1].value],
    ["Jobs Completed", jobData[2].value],
    ["Healthy Components", healthyCount],
    ["Overdue Components", overdueCount]
  ];

  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "entnt_dashboard_metrics.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <><div className="flex justify-end mb-4">
      <button
        onClick={exportKPItoCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download KPI Metrics
      </button>
    </div>
    <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Job Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={jobData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {jobData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Component Maintenance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={componentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div></>
  );
};

export default Charts;
