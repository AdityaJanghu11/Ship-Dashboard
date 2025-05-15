// src/pages/LoginPage.jsx
import LoginForm from "../components/Authentication/LoginForm";


const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Ship Maintenance Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
