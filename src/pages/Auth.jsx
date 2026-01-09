import { useState } from "react";
import api from "../lib/api";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { Lock, MessageSquare, User } from "lucide-react";
import { Button } from "../components";

export default function Auth() {
  const navigate = useNavigate();

  const { setToken, setUser } = useUserStore();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const { data } = await api.post(endpoint, { username, password });

      setToken(data.token);
      setUser({ id: data.userId, username: data.username });

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-auth">
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl ">
            <MessageSquare size={32} className="text-white" />
          </div>
        </div>

        <div className="card-surface rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-center text-main mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-center text-muted mb-8">
            {isLogin ? "Sign in to continue" : "Sign up to get started"}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-label mb-2">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-faint"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 input-primary rounded-xl transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-label mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-faint"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 input-primary rounded-xl transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type={"submit"}
              text={isLogin ? "Login" : "Sign Up"}
              className={
                "bg-primary mt-2 w-full py-3 rounded-xl text-white shadow-lg"
              }
            />
          </form>

          <p className="text-center text-sm text-sub mt-6">
            {isLogin ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold cursor-pointer"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-faint text-sm mt-6">
          Secure and encrypted messaging
        </p>
      </div>
    </div>
  );
}
