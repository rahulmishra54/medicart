import { useState } from "react";
import { X } from "lucide-react";

const UpdateStockModal = ({ product, onClose, onUpdate }) => {
  const [stock, setStock] = useState(product.stock);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...product,
      stock: Number(stock),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">

          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Update Stock
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5">

          <div className="flex items-center gap-4">

            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                {product.name}
              </h3>

              <p className="text-sm text-slate-500">
                {product.brand}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Current Stock:{" "}
                <span className="font-semibold">
                  {product.stock}
                </span>
              </p>
            </div>

          </div>

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Stock Quantity
            </label>

            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Update Stock
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;