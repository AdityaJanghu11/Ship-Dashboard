import JobCalendar from "../components/Jobs/JobCalendar";

const CalendarPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Maintenance Calendar</h1>
      <div className="card">
        <JobCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
