import { useEffect, useState } from "react";
import { CalendarDays, FileText, PackagePlus } from "lucide-react";
import api from "../api/api.js";
import AddProductImages from "./AddProductImage.jsx";

const initialForm = {
  name: "",
  brand: "",
  category: "",
  subCategory: "",
  genericName: "",
  manufacturer: "",
  price: "",
  mrp: "",
  stockQuantity: "",
  description: "",
  dosageForm: "",
  prescriptionRequired: false,
  expiryDate: "",
  featured: false,
  active: true,
};

const inputClassName = "mt-1.5 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm text-[#17324D] outline-none transition focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10";
const labelClassName = "block min-w-0 text-sm font-medium text-[#17324D]";

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [image, setImage] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setCategoryError("");

      try {
        const response = await api.get("/categories");
        const categoryRecords = response.data?.categories;

        if (!Array.isArray(categoryRecords)) {
          throw new Error("Unexpected category response");
        }

        setCategories(categoryRecords);
      } catch {
        setCategoryError("Unable to load categories. Please try again.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSuccess("");

    const price = Number(form.price);
    const mrp = Number(form.mrp);
    const stockQuantity = Number(form.stockQuantity);

    if (!form.name.trim() || !form.brand.trim() || !form.manufacturer.trim()
      || !form.description.trim() || !form.category || !form.expiryDate) {
      setSubmitError("Complete all required product information.");
      return;
    }

    if (form.price === "" || form.mrp === "" || form.stockQuantity === ""
      || !Number.isFinite(price) || price < 0
      || !Number.isFinite(mrp) || mrp < 0
      || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
      setSubmitError("Enter valid non-negative prices and a whole-number stock quantity.");
      return;
    }

    if (categories.length === 0) {
      setSubmitError("Add a category before creating a medicine.");
      return;
    }

    const productData = new FormData();
    Object.entries(form).forEach(([name, value]) => {
      productData.append(name, String(value));
    });
    if (image) productData.append("image", image);

    setSubmitting(true);

    try {
      const response = await api.post("/medicines/", productData);
      if (!response.data?.medicine) {
        throw new Error("Unexpected medicine response");
      }

      setSuccess("Product added successfully.");
      setForm(initialForm);
      setImage(null);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setSubmitError("Sign in with an approved pharmacist account to add products.");
      } else {
        setSubmitError(error.response?.data?.message || "Unable to add product. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-[#EEF3F5] pb-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5F6F0] text-[#15966F]">
            <PackagePlus size={19} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#17324D]">Product information</h2>
            <p className="mt-0.5 text-sm text-[#718096]">Enter the medicine details for your listing.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className={labelClassName}>
            Product name *
            <input name="name" value={form.name} onChange={handleChange} required maxLength={150} placeholder="e.g. Paracetamol 500 mg" className={inputClassName} />
          </label>
          <label className={labelClassName}>
            Brand *
            <input name="brand" value={form.brand} onChange={handleChange} required placeholder="e.g. Crocin" className={inputClassName} />
          </label>
          <label className={labelClassName}>
            Category *
            <select name="category" value={form.category} onChange={handleChange} required disabled={loadingCategories || categories.length === 0} className={`${inputClassName} disabled:bg-slate-50`}>
              <option value="">{loadingCategories ? "Loading categories..." : "Select category"}</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className={labelClassName}>
            Subcategory
            <input name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="Optional" className={inputClassName} />
          </label>
          <label className={labelClassName}>
            Generic name
            <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="e.g. Paracetamol" className={inputClassName} />
          </label>
          <label className={labelClassName}>
            Manufacturer *
            <input name="manufacturer" value={form.manufacturer} onChange={handleChange} required placeholder="Manufacturer name" className={inputClassName} />
          </label>
        </div>
        {categoryError && <p role="alert" className="mt-3 text-sm text-red-700">{categoryError}</p>}

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className={labelClassName}>
            Price (₹) *
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required className={inputClassName} />
          </label>
          <label className={labelClassName}>
            MRP (₹) *
            <input name="mrp" type="number" min="0" step="0.01" value={form.mrp} onChange={handleChange} required className={inputClassName} />
          </label>
          <label className={labelClassName}>
            Stock quantity *
            <input name="stockQuantity" type="number" min="0" step="1" value={form.stockQuantity} onChange={handleChange} required className={inputClassName} />
          </label>
        </div>

        <label className={`${labelClassName} mt-5`}>
          Description *
          <textarea name="description" value={form.description} onChange={handleChange} required maxLength={500} rows={4} placeholder="Describe the medicine" className="mt-1.5 w-full resize-y rounded-lg border border-[#DCE7EC] p-3 text-sm text-[#17324D] outline-none focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10" />
        </label>
      </section>

      <section className="rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-[#EEF3F5] pb-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FC] text-[#237DA8]">
            <FileText size={19} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-[#17324D]">Additional information</h2>
            <p className="mt-0.5 text-sm text-[#718096]">Set dosage, expiry, and product visibility.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className={labelClassName}>
            Dosage form
            <select name="dosageForm" value={form.dosageForm} onChange={handleChange} className={inputClassName}>
              <option value="">Not specified</option>
              {["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Ointment", "Drops", "Powder", "Other"].map((dosageForm) => (
                <option key={dosageForm} value={dosageForm}>{dosageForm}</option>
              ))}
            </select>
          </label>
          <label className={labelClassName}>
            Expiry date *
            <span className="relative block">
              <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required className={inputClassName} />
              <CalendarDays size={17} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#718096]" />
            </span>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#EEF3F5] pt-4">
          {[
            ["prescriptionRequired", "Prescription required"],
            ["featured", "Featured product"],
            ["active", "Active"],
          ].map(([name, label]) => (
            <label key={name} className="inline-flex items-center gap-2 text-sm font-medium text-[#475569]">
              <input name={name} type="checkbox" checked={form[name]} onChange={handleChange} className="h-4 w-4 accent-[#15966F]" />
              {label}
            </label>
          ))}
        </div>
      </section>

      <AddProductImages image={image} onImageChange={setImage} disabled={submitting} />

      {submitError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
      {success && <p role="status" className="rounded-lg bg-[#E5F6F0] px-4 py-3 text-sm text-[#117F5E]">{success}</p>}

      <div className="flex justify-end border-t border-[#DCE7EC] pt-4">
        <button type="submit" disabled={submitting || loadingCategories || Boolean(categoryError) || categories.length === 0} className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#15966F] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#117F5E] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {submitting ? "Adding product..." : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
