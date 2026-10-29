
import "./App.css";
import { useEffect, useRef } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import api from "./api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./redux/authSlice.js";
import { Toaster } from "sonner";
function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  const restoreStarted = useRef(false);

  useEffect(() => {
    if (restoreStarted.current) return;
    restoreStarted.current = true;

    async function getCurrentUser() {
      try {
        const response = await api.get("/auth/me", { timeout: 10000 });
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

  if (!initialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAFC] px-4 text-[#0B3154]">
        <p role="status" className="text-sm font-medium text-[#718096]">
          Loading MediCart...
        </p>
      </main>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
