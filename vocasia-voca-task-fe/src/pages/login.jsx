import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";

const Login = () => {
  const {login, token} = useAuthStore((state) => state);
  const navigate = useNavigate();


  useEffect(() => {
      if(token) {
          navigate("/");
      }
  }, [token, navigate]);

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    return result; 
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-6 py-12 w-1/4 bg-base-200 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">VocaTask</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;

