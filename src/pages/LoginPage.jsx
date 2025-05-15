import LoginForm from "../components/Authentication/LoginForm";

const LoginPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-blue-50">
    <div className="card w-full max-w-md">
      <h1 className="text-xl font-bold text-center mb-4">Login</h1>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
