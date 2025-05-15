import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";

const JobsPage = () => {
  return (
    <div className="container">
      <h1 className="page-title">Jobs</h1>

      <div className="card mb-6">
        <div className="card-header">Create Job</div>
        <JobForm />
      </div>

      <div className="card">
        <div className="card-header">All Jobs</div>
        <JobList />
      </div>
    </div>
  );
};

export default JobsPage;
