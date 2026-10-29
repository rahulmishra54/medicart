import Footer from "../../component/user/Footer.jsx";
import MedicineCatalog from "../../component/user/Medicines.jsx";
import Navbar from "../../component/user/Navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../api/api.js";

function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines/");
      setMedicines(response.data.medicines);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  fetchMedicines();
}, []);
  return (
    <div className="min-h-screen min-w-0 bg-white">
  <Navbar />

  <main className="w-full min-w-0">
    {loading && (
      <p className="p-8 text-center text-sm text-slate-500">
        Loading medicines...
      </p>
    )}

    {error && (
      <p role="alert" className="p-8 text-center text-sm text-red-700">
        Unable to load medicines: {error}
      </p>
    )}

    {!loading && !error && (
      <MedicineCatalog medicines={medicines} />
    )}
  </main>

  <Footer />
</div>
  );
}

export default Medicines;