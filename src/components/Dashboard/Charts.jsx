import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useJobs } from "../../contexts/JobsContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Charts = () => {
  const { jobs } = useJobs();

  const data = [
    { name: "Open", value: jobs.filter((j) => j.status === "Open").length },
    { name: "In Progress", value: jobs.filter((j) => j.status === "In Progress").length },
    { name: "Completed", value: jobs.filter((j) => j.status === "Completed").length }
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Job Status Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
