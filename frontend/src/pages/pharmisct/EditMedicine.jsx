import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import PharmistNavBar from "../../component/PharmistNavBar.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";
import api from "../../api/api.js";

const emptyForm = {
  name: "",
  brand: "",
  genericName: "",
  manufacturer: "",
  description: "",
  category: "",
  subCategory: "",
  price: "",
  mrp: "",
  stockQuantity: "",
  dosageForm: "",
  prescriptionRequired: false,
  expiryDate: "",
  image: "",
  featured: false,
  active: true,
};

const EditMedicine = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isPharmacist = user?.role === "pharmacist";
  const returnPath = isPharmacist ? "/pharmacist/inventory" : "/admin/medicines";
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicine = async () => {
      setLoading(true);
      setError("");

      try {
        const [medicineResponse, categoryResponse] = await Promise.all([
          api.get(`/medicines/${medicineId}`),
          api.get("/categories"),
        ]);
        const medicine = medicineResponse.data?.medicine;
        const categoryRecords = categoryResponse.data?.categories;

        if (!medicine) {
          throw new Error("Medicine not found");
        }

        setForm({
          name: medicine.name || "",
          brand: medicine.brand || "",
          genericName: medicine.genericName || "",
          manufacturer: medicine.manufacturer || "",
          description: medicine.description || "",
          category: medicine.category?._id || medicine.category || "",
          subCategory: medicine.subCategory || "",
          price: medicine.price ?? "",
          mrp: medicine.mrp ?? "",
          stockQuantity: medicine.stockQuantity ?? "",
          dosageForm: medicine.dosageForm || "",
          prescriptionRequired: Boolean(medicine.prescriptionRequired),
          expiryDate: medicine.expiryDate
            ? new Date(medicine.expiryDate).toISOString().slice(0, 10)
            : "",
          image: medicine.image || "",
          featured: Boolean(medicine.featured),
          active: medicine.active !== false,
        });
        setCategories(Array.isArray(categoryRecords) ? categoryRecords : []);
      } catch {
        setError("Unable to load this medicine. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [medicineId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.brand.trim() || !form.manufacturer.trim()
      || !form.description.trim() || !form.category || !form.expiryDate) {
      setError("Complete all required medicine details.");
      return;
    }

    const price = Number(form.price);
    const mrp = Number(form.mrp);
    const stockQuantity = Number(form.stockQuantity);
    if (form.price === "" || form.mrp === "" || form.stockQuantity === ""
      || !Number.isFinite(price) || price < 0 || !Number.isFinite(mrp) || mrp < 0
      || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
      setError("Enter valid non-negative prices and a whole-number stock quantity.");
      return;
    }

    setSaving(true);

    try {
      const response = await api.patch(`/medicines/${medicineId}`, {
        ...form,
        name: form.name.trim(),
        brand: form.brand.trim(),
        genericName: form.genericName.trim(),
        manufacturer: form.manufacturer.trim(),
        description: form.description.trim(),
        subCategory: form.subCategory.trim(),
        price,
        mrp,
        stockQuantity,
      });

      if (!response.data?.medicine) {
        throw new Error("Unexpected medicine update response");
      }

      navigate(returnPath, {
        state: { success: "Medicine updated successfully." },
      });
    } catch {
      setError("Unable to save medicine changes. Please check the details and try again.");
    } finally {
      setSaving(false);
    }
  };

  const formContent = (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-[#64748B]">Catalog / Medicine {medicineId}</p>
          <h1 className="mt-1 text-2xl font-bold text-[#17324D]">Edit medicine</h1>
        </div>
        <Link
          to={returnPath}
          className="text-sm font-semibold text-[#15966F] hover:underline"
        >
          Back to medicines
        </Link>
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <p role="status" className="rounded-xl border border-[#E2EDF1] bg-white p-8 text-center text-sm text-[#718096]">Loading medicine...</p>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#17324D]">
              Medicine name *
              <input name="name" value={form.name} onChange={handleChange} required maxLength={150} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Brand *
              <input name="brand" value={form.brand} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Generic name
              <input name="genericName" value={form.genericName} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Manufacturer *
              <input name="manufacturer" value={form.manufacturer} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Category *
              <select name="category" value={form.category} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm outline-none focus:border-[#15966F]">
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Subcategory
              <input name="subCategory" value={form.subCategory} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Price *
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              MRP *
              <input name="mrp" type="number" min="0" step="0.01" value={form.mrp} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Stock quantity *
              <input name="stockQuantity" type="number" min="0" step="1" value={form.stockQuantity} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Dosage form
              <select name="dosageForm" value={form.dosageForm} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm outline-none focus:border-[#15966F]">
                <option value="">Not specified</option>
                {["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Ointment", "Drops", "Powder", "Other"].map((formValue) => (
                  <option key={formValue} value={formValue}>{formValue}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-[#17324D]">
              Expiry date *
              <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D] sm:col-span-2">
              Image URL
              <input name="image" type="url" value={form.image} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
            <label className="text-sm font-medium text-[#17324D] sm:col-span-2">
              Description *
              <textarea name="description" value={form.description} onChange={handleChange} required maxLength={500} rows={4} className="mt-2 w-full rounded-lg border border-[#DCE7EC] p-3 text-sm outline-none focus:border-[#15966F]" />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-5 border-t border-[#EEF3F5] pt-4">
            {[
              ["prescriptionRequired", "Prescription required"],
              ["featured", "Featured medicine"],
              ["active", "Active medicine"],
            ].map(([name, label]) => (
              <label key={name} className="inline-flex items-center gap-2 text-sm text-[#475569]">
                <input name={name} type="checkbox" checked={form[name]} onChange={handleChange} className="h-4 w-4 accent-[#15966F]" />
                {label}
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-[#EEF3F5] pt-5 sm:flex-row">
            <Link to={returnPath} className="rounded-lg border border-[#DCE7EC] px-4 py-2.5 text-center text-sm font-medium text-[#64748B]">Cancel</Link>
            <button type="submit" disabled={saving} className="rounded-lg bg-[#15966F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#117F5E] disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  if (isPharmacist) return <PharmacistLayout>{formContent}</PharmacistLayout>;

  return <div className="min-h-screen w-full bg-[#F5FAFC]">
    <PharmistNavBar />
    <div className="lg:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1">{formContent}</main>
    </div>
  </div>;
};

export default EditMedicine;