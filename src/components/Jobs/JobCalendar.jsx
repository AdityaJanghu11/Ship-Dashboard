import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import dayjs from "dayjs";

// Utility: get array of days for the current month
const getMonthDays = (year, month) => {
  const start = dayjs().year(year).month(month).startOf("month").startOf("week");
  const end = dayjs().year(year).month(month).endOf("month").endOf("week");
  const days = [];

  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    days.push(current);
    current = current.add(1, "day");
  }

  return days;
};

const JobCalendar = () => {
  const { jobs } = useJobs();
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());

  const days = getMonthDays(year, month);
  const jobsByDate = jobs.reduce((acc, job) => {
    const date = job.scheduledDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(job);
    return acc;
  }, {});

  const handleDateClick = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const selectedJobs = jobsByDate[selectedDate] || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Maintenance Calendar</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setMonth(month === 0 ? 11 : month - 1)}
          className="text-blue-600"
        >
          ← Prev
        </button>
        <h3 className="text-lg font-bold">
          {dayjs().month(month).format("MMMM")} {year}
        </h3>
        <button
          onClick={() => setMonth(month === 11 ? 0 : month + 1)}
          className="text-blue-600"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
        {days.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const hasJobs = jobsByDate[dateStr]?.length;

          return (
            <div
              key={dateStr}
              onClick={() => handleDateClick(day)}
              className={`h-20 p-1 border rounded cursor-pointer relative ${
                day.format("MM") !== String(month + 1).padStart(2, "0")
                  ? "text-gray-400"
                  : "text-gray-900"
              } ${selectedDate === dateStr ? "bg-blue-100" : ""}`}
            >
              <div className="text-sm">{day.date()}</div>
              {hasJobs && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Jobs on Selected Day */}
      {selectedDate && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">
            Jobs on {selectedDate}
          </h4>
          {selectedJobs.length === 0 ? (
            <p className="text-gray-600">No jobs scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {selectedJobs.map((job) => (
                <li key={job.id} className="border p-2 rounded bg-white">
                  <strong>{job.type}</strong> – {job.priority} – {job.status}
                  <div className="text-sm text-gray-600">
                    Engineer ID: {job.assignedEngineerId}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCalendar;
