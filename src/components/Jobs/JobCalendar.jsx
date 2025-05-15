import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import dayjs from "dayjs";

// Generate calendar grid
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
  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());
  const [selectedDate, setSelectedDate] = useState(null);

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
    <div>
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setMonth(month === 0 ? 11 : month - 1)}
          className="btn btn-secondary"
        >
          ← Prev
        </button>
        <h2 className="text-lg font-semibold">
          {dayjs().month(month).format("MMMM")} {year}
        </h2>
        <button
          onClick={() => setMonth(month === 11 ? 0 : month + 1)}
          className="btn btn-secondary"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-sm mb-6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {days.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const hasJobs = jobsByDate[dateStr]?.length;

          return (
            <div
              key={dateStr}
              onClick={() => handleDateClick(day)}
              className={`h-20 p-2 border rounded cursor-pointer relative ${
                day.month() !== month ? "text-gray-400" : "text-gray-800"
              } ${selectedDate === dateStr ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <div>{day.date()}</div>
              {hasJobs && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Job List for Selected Date */}
      {selectedDate && (
        <div className="card">
          <div className="card-header">Jobs on {selectedDate}</div>
          {selectedJobs.length === 0 ? (
            <p className="text-gray-600">No jobs scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {selectedJobs.map((job) => (
                <li key={job.id} className="border p-2 rounded bg-white shadow-sm">
                  <strong>{job.type}</strong> – {job.priority} – {job.status}
                  <div className="text-sm text-gray-600">
                    Engineer: {job.assignedEngineerId}
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
