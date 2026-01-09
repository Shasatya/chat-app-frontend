import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import useUserStore from "./store/userStore";
import Home from "./pages/Home";
import { useEffect } from "react";
import { ThemeManager } from "./components";

function App() {
  const { token, user, checkAuth, isLoading } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ThemeManager />
      <Routes>
        <Route path="/" element={!token ? <Auth /> : <Navigate to="/home" />} />
        <Route
          path="/home"
          element={token && user ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
