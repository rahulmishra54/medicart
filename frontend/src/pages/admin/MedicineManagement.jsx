import { useEffect, useState } from "react";
import { Pencil, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import PharmistNavBar from "../../component/PharmistNavBar.jsx";
import api from "../../api/api.js";

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError("");

      try {
        const [medicineResponse, categoryResponse] = await Promise.all([
          api.get("/admin/medicines"),
          api.get("/admin/categories"),
        ]);
        const medicineRecords = medicineResponse.data?.medicines;
        const categoryRecords = categoryResponse.data?.categories;

        if (!Array.isArray(medicineRecords)) {
          throw new Error("Unexpected medicine response");
        }

        setMedicines(medicineRecords);
        setCategories(Array.isArray(categoryRecords) ? categoryRecords : []);
      } catch {
        setError("Unable to load medicines. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const categoryName = (medicine) => {
    if (medicine.category && typeof medicine.category === "object") {
      return medicine.category.name || "Not provided";
    }

    const category = categories.find((item) => item._id === medicine.category);
    return category?.name || "Not provided";
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const query = search.trim().toLowerCase();
    return !query || [
      medicine.name,
      medicine.brand,
      medicine.genericName,
      medicine.manufacturer,
    ].some((value) => value?.toLowerCase().includes(query));
  });

  const formatDate = (date) => date
    ? new Date(date).toLocaleDateString()
    : "Not provided";

  return (
    <div className="min-h-screen w-full bg-[#F5FAFC]">
      <PharmistNavBar />
      <div className="lg:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl space-y-5 p-4 sm:p-6 lg:p-8">
            <header>
              <p className="text-sm font-medium text-[#15966F]">Catalog management</p>
              <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">
                Medicine Management
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#718096]">
                Review and update medicine listings.
              </p>
            </header>

            {location.state?.success && (
              <p role="status" className="rounded-lg bg-[#E5F6F0] px-4 py-3 text-sm text-[#117F5E]">
                {location.state.success}
              </p>
            )}

            <section className="space-y-4 rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-5">
              <label className="relative block min-w-0">
                <span className="sr-only">Search medicines</span>
                <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, brand, generic name, or manufacturer"
                  className="h-11 w-full rounded-lg border border-[#DCE7EA] pl-10 pr-3 text-sm text-[#17324D] outline-none focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10"
                />
              </label>

              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              {loading ? (
                <p role="status" className="py-10 text-center text-sm text-[#718096]">Loading medicines...</p>
              ) : error ? null : filteredMedicines.length === 0 ? (
                <p className="py-10 text-center text-sm text-[#718096]">
                  {medicines.length ? "No medicines match your search." : "No medicines have been added yet."}
                </p>
              ) : (
                <>
                  <div className="space-y-3 lg:hidden">
                    {filteredMedicines.map((medicine) => (
                      <article key={medicine._id} className="min-w-0 rounded-lg border border-[#E2EDF1] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h2 className="break-words font-semibold text-[#17324D]">{medicine.name}</h2>
                            <p className="mt-1 text-sm text-[#718096]">{medicine.brand}</p>
                          </div>
                          <Link
                            to={`/admin/medicines/${medicine._id}/edit`}
                            aria-label={`Edit ${medicine.name}`}
                            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-[#117F5E] hover:bg-[#E5F6F0]"
                          >
                            <Pencil size={15} aria-hidden="true" />
                            Edit
                          </Link>
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                          <div><dt className="text-xs text-[#718096]">Category</dt><dd className="mt-1 text-[#475569]">{categoryName(medicine)}</dd></div>
                          <div><dt className="text-xs text-[#718096]">Manufacturer</dt><dd className="mt-1 break-words text-[#475569]">{medicine.manufacturer || "Not provided"}</dd></div>
                          <div><dt className="text-xs text-[#718096]">Price</dt><dd className="mt-1 text-[#475569]">₹{medicine.price}</dd></div>
                          <div><dt className="text-xs text-[#718096]">Stock</dt><dd className="mt-1 text-[#475569]">{medicine.stockQuantity}</dd></div>
                          <div><dt className="text-xs text-[#718096]">Expiry</dt><dd className="mt-1 text-[#475569]">{formatDate(medicine.expiryDate)}</dd></div>
                        </dl>
                      </article>
                    ))}
                  </div>

                  <div className="hidden overflow-x-auto rounded-lg border border-[#E2EDF1] lg:block">
                    <table className="w-full min-w-[900px] text-left text-sm">
                      <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Medicine</th>
                          <th className="px-4 py-3 font-semibold">Category</th>
                          <th className="px-4 py-3 font-semibold">Manufacturer</th>
                          <th className="px-4 py-3 font-semibold">Price</th>
                          <th className="px-4 py-3 font-semibold">Stock</th>
                          <th className="px-4 py-3 font-semibold">Expiry</th>
                          <th className="px-4 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedicines.map((medicine) => (
                          <tr key={medicine._id} className="border-t border-[#EEF3F5] text-[#475569]">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-[#17324D]">{medicine.name}</p>
                              <p className="mt-1 text-xs text-[#718096]">{medicine.brand}</p>
                            </td>
                            <td className="px-4 py-4">{categoryName(medicine)}</td>
                            <td className="px-4 py-4">{medicine.manufacturer || "Not provided"}</td>
                            <td className="whitespace-nowrap px-4 py-4">₹{medicine.price}</td>
                            <td className="px-4 py-4">{medicine.stockQuantity}</td>
                            <td className="whitespace-nowrap px-4 py-4">{formatDate(medicine.expiryDate)}</td>
                            <td className="px-4 py-3">
                              <Link
                                to={`/admin/medicines/${medicine._id}/edit`}
                                className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-[#117F5E] hover:bg-[#E5F6F0]"
                              >
                                <Pencil size={15} aria-hidden="true" />
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedicineManagement;