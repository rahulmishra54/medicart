import { X } from "lucide-react";

const CategoryModal = ({ open, category, onClose, onSave }) => {
  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      name: formData.get("name").trim(),
      description: formData.get("description").trim(),
      active: formData.get("status") === "active",
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/40 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="category-dialog-title" className="max-h-[calc(100vh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-xl border border-[#E2EDF1] bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#EEF3F5] px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id="category-dialog-title" className="text-lg font-semibold text-[#17324D] sm:text-xl">{category ? "Edit category" : "Add category"}</h2>
            <p className="mt-1 text-sm text-[#718096]">Enter the category details below.</p>
          </div>
          <button type="button" aria-label="Close dialog" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F6FAFC]">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-4 py-5 sm:px-6">
            <label className="block text-sm font-medium text-[#17324D]">
              Category name <span className="text-red-600">*</span>
              <input name="name" required maxLength={80} defaultValue={category?.name ?? ""} placeholder="e.g. Personal Care" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm font-normal outline-none placeholder:text-[#94A3B8] focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10" />
            </label>
            <label className="block text-sm font-medium text-[#17324D]">
              Description
              <textarea name="description" rows={4} maxLength={300} defaultValue={category?.description ?? ""} placeholder="Describe the products in this category" className="mt-2 w-full resize-y rounded-lg border border-[#DCE7EC] p-3 text-sm font-normal outline-none placeholder:text-[#94A3B8] focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10" />
            </label>
            <label className="block text-sm font-medium text-[#17324D]">
              Status
              <select name="status" defaultValue={category?.active === false ? "inactive" : "active"} className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm outline-none focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-[#EEF3F5] bg-[#F8FBFC] px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button type="button" onClick={onClose} className="h-11 rounded-lg border border-[#DCE7EC] bg-white px-4 text-sm font-medium text-[#475569] hover:bg-[#F6FAFC]">Cancel</button>
            <button type="submit" className="h-11 rounded-lg bg-[#15966F] px-5 text-sm font-semibold text-white hover:bg-[#117F5E]">{category ? "Save changes" : "Save category"}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CategoryModal;