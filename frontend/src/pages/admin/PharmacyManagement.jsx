import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  X,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import CategoryStats from "../../component/admin/CategoryStats.jsx";
import PharmacyTable from "../../component/admin/PharmacyTable.jsx";
import PharmistNavBar from "../../component/PharmistNavBar.jsx";
import api from "../../api/api.js";
import {
  getAllPharmacies,
  getPharmacyStats,
  setPharmacyError,
  setPharmacyLoading,
  setPharmacyStatsError,
  setPharmacyStatsLoading,
  updatePharmacy,
} from "../../redux/pharmacyManagment.js";

const statusOptions = ["all", "pending", "approved", "rejected"];

const normalizePharmacyStatus = (status) => {
  const normalizedStatus = typeof status === "string" ? status.trim().toLowerCase() : "";
  return normalizedStatus === "approved" || normalizedStatus === "rejected"
    ? normalizedStatus
    : "pending";
};

const PharmacyManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [updatingPharmacyId, setUpdatingPharmacyId] = useState(null);
  const dispatch = useDispatch();
  const pharmacies = useSelector((state) => state.pharmacy.pharmacies);
  const stats = useSelector((state) => state.pharmacy.pharmaciesStats);
  const loading = useSelector((state) => state.pharmacy.loading);
  const statsLoading = useSelector((state) => state.pharmacy.statsLoading);
  const error = useSelector((state) => state.pharmacy.error);
  const statsError = useSelector((state) => state.pharmacy.statsError);

  useEffect(() => {
    const fetchPharmacies = async () => {
      dispatch(setPharmacyLoading(true));
      dispatch(setPharmacyError(null));

      try {
        const response = await api.get("/admin/pharmacies");
        const pharmacyRecords = response.data?.pharmacies;

        if (!Array.isArray(pharmacyRecords)) {
          throw new Error("Unexpected pharmacy response");
        }

        dispatch(getAllPharmacies(pharmacyRecords.map((pharmacy) => ({
          ...pharmacy,
          status: normalizePharmacyStatus(pharmacy.status),
        }))));
      } catch {
        dispatch(setPharmacyError("Unable to load pharmacies. Please try again."));
      } finally {
        dispatch(setPharmacyLoading(false));
      }
    };

    fetchPharmacies();
  }, [dispatch, statusFilter]);

  useEffect(() => {
    const fetchPharmacyStats = async () => {
      dispatch(setPharmacyStatsLoading(true));
      dispatch(setPharmacyStatsError(null));

      try {
        const response = await api.get("/admin/pharmacies/stats");
        const pharmacyStats = response.data?.stats;

        if (!pharmacyStats || Array.isArray(pharmacyStats) || typeof pharmacyStats !== "object") {
          throw new Error("Unexpected pharmacy statistics response");
        }

        dispatch(getPharmacyStats(pharmacyStats));
      } catch {
        dispatch(setPharmacyStatsError("Unable to load pharmacy statistics."));
      } finally {
        dispatch(setPharmacyStatsLoading(false));
      }
    };

    fetchPharmacyStats();
  }, [dispatch]);

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [
      pharmacy.name,
      pharmacy.email,
      pharmacy.phone,
      pharmacy.address,
      pharmacy.licenseNumber,
    ].some((value) => value?.toLowerCase().includes(query));
    const matchesStatus = statusFilter === "all"
      || normalizePharmacyStatus(pharmacy.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const refreshStats = async () => {
    dispatch(setPharmacyStatsLoading(true));
    dispatch(setPharmacyStatsError(null));

    try {
      const response = await api.get("/admin/pharmacies/stats");
      const pharmacyStats = response.data?.stats;

      if (!pharmacyStats || Array.isArray(pharmacyStats) || typeof pharmacyStats !== "object") {
        throw new Error("Unexpected pharmacy statistics response");
      }

      dispatch(getPharmacyStats(pharmacyStats));
    } catch {
      dispatch(setPharmacyStatsError("Pharmacy updated, but statistics could not be refreshed."));
    } finally {
      dispatch(setPharmacyStatsLoading(false));
    }
  };

  const updatePharmacyStatus = async (pharmacy, action) => {
    setUpdatingPharmacyId(pharmacy._id);
    dispatch(setPharmacyError(null));

    try {
      const response = await api.patch(`/admin/pharmacies/${pharmacy._id}/${action}`);
      const updatedPharmacy = response.data?.pharmacy;

      if (!updatedPharmacy || typeof updatedPharmacy !== "object") {
        throw new Error("Unexpected pharmacy update response");
      }

      dispatch(updatePharmacy(updatedPharmacy));
      setSelectedPharmacy((current) => (
        current?._id === updatedPharmacy._id ? updatedPharmacy : current
      ));
      await refreshStats();
    } catch {
      dispatch(setPharmacyError(`Unable to ${action} pharmacy. Please try again.`));
    } finally {
      setUpdatingPharmacyId(null);
    }
  };

  const viewPharmacy = async (pharmacyId) => {
    dispatch(setPharmacyError(null));

    try {
      const response = await api.get(`/admin/pharmacies/${pharmacyId}`);
      const pharmacy = response.data?.pharmacy;

      if (!pharmacy || typeof pharmacy !== "object") {
        throw new Error("Unexpected pharmacy details response");
      }

      setSelectedPharmacy({
        ...pharmacy,
        status: normalizePharmacyStatus(pharmacy.status),
      });
    } catch {
      dispatch(setPharmacyError("Unable to load pharmacy details. Please try again."));
    }
  };

  const formatDate = (date) => date
    ? new Date(date).toLocaleDateString()
    : "Not provided";

  const pharmacyStats = [
    {
      title: "Total Pharmacies",
      value: stats.totalPharmacies,
      icon: Building2,
      color: "text-[#237DA8]",
      bg: "bg-[#EDF7FC]",
    },
    {
      title: "Pending",
      value: stats.pendingPharmacies,
      icon: Clock3,
      color: "text-[#D97706]",
      bg: "bg-amber-50",
    },
    {
      title: "Approved",
      value: stats.approvedPharmacies,
      icon: CheckCircle2,
      color: "text-[#15966F]",
      bg: "bg-[#E5F6F0]",
    },
    {
      title: "Rejected",
      value: stats.rejectedPharmacies,
      icon: XCircle,
      color: "text-red-700",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F5FAFC]">
      <PharmistNavBar />
      <div className="lg:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">
            <header>
              <p className="text-sm font-medium text-[#15966F]">Partner management</p>
              <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">
                Pharmacy Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">
                Review pharmacy registrations, verify licenses, and manage partner status.
              </p>
            </header>

            <CategoryStats stats={pharmacyStats} loading={statsLoading} columns={4} />
            {statsError && <p role="alert" className="text-sm text-red-700">{statsError}</p>}

            <section className="space-y-4 rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-5">
              <label className="sr-only" htmlFor="pharmacy-search">Search pharmacies</label>
              <input
                id="pharmacy-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone, address, or license"
                className="h-11 w-full min-w-0 rounded-lg border border-[#DCE7EA] px-3 text-sm text-[#17324D] outline-none focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10"
              />

              <div className="flex min-w-0 gap-2 overflow-x-auto border-b border-[#E2EDF1]" role="tablist" aria-label="Pharmacy status">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    role="tab"
                    aria-selected={statusFilter === status}
                    onClick={() => setStatusFilter(status)}
                    className={`shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium capitalize transition ${
                      statusFilter === status
                        ? "border-[#15966F] text-[#117F5E]"
                        : "border-transparent text-[#718096] hover:text-[#17324D]"
                    }`}
                  >
                    {status === "all" ? "All pharmacies" : status}
                  </button>
                ))}
              </div>

              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              {loading ? (
                <p role="status" className="py-10 text-center text-sm text-[#718096]">
                  Loading pharmacies...
                </p>
              ) : error ? null : (
                <PharmacyTable
                  pharmacies={filteredPharmacies}
                  updatingPharmacyId={updatingPharmacyId}
                  onView={viewPharmacy}
                  onStatusChange={updatePharmacyStatus}
                />
              )}
            </section>
          </div>
        </main>
      </div>

      {selectedPharmacy && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#17324D]/35 p-4 sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPharmacy(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pharmacy-detail-title"
            className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-[#E2EDF1] bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#15966F]">Pharmacy details</p>
                <h2 id="pharmacy-detail-title" className="mt-1 text-xl font-bold text-[#17324D]">
                  {selectedPharmacy.name}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedPharmacy(null)}
                className="rounded-md p-2 text-[#64748B] hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-[#718096]">Email</dt><dd className="mt-1 break-all font-medium text-[#17324D]">{selectedPharmacy.email || "Not provided"}</dd></div>
              <div><dt className="text-[#718096]">Phone</dt><dd className="mt-1 font-medium text-[#17324D]">{selectedPharmacy.phone || "Not provided"}</dd></div>
              <div><dt className="text-[#718096]">Address</dt><dd className="mt-1 font-medium text-[#17324D]">{selectedPharmacy.address || "Not provided"}</dd></div>
              <div><dt className="text-[#718096]">License number</dt><dd className="mt-1 font-medium text-[#17324D]">{selectedPharmacy.licenseNumber || "Not provided"}</dd></div>
              <div><dt className="text-[#718096]">Status</dt><dd className="mt-1 font-medium capitalize text-[#17324D]">{selectedPharmacy.status || "Not provided"}</dd></div>
              <div><dt className="text-[#718096]">Registration date</dt><dd className="mt-1 font-medium text-[#17324D]">{formatDate(selectedPharmacy.createdAt)}</dd></div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
};

export default PharmacyManagement;
