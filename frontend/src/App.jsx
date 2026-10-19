
import "./App.css";
import { useEffect, useRef } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import api from "./api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./redux/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  const restoreStarted = useRef(false);

  useEffect(() => {
    if (restoreStarted.current) return;
    restoreStarted.current = true;

    async function getCurrentUser() {
      try {
        const response = await api.get("/auth/me");
        dispatch(restoreSession(response.data.user ?? null));
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Failed to restore current user:", error.message);
        }
        dispatch(restoreSession(null));
      }
    }

    getCurrentUser();
  }, [dispatch]);

  if (!initialized) return null;

  return <AppRoutes />;
}

export default App;
