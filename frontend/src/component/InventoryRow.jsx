import { Pencil } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const InventoryRow = ({ product, index, onUpdate }) => {
  const getStatus = () => {
    if (product.stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-100 text-red-600",
      };
    }

    if (product.stock <= 10) {
      return {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-100 text-green-600",
    };
  };

  const status = getStatus();

  return (
    <>
      {/* Desktop Row */}
      <div className="hidden grid-cols-12 items-center gap-4 border-t border-slate-100 px-5 py-4 xl:grid">

        <div className="col-span-1 text-sm text-slate-500">
          {index + 1}
        </div>

        <div className="col-span-3 flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {product.name}
            </p>

            <p className="text-xs text-slate-400">
              {product.brand}
            </p>
          </div>
        </div>

        <div className="col-span-2 text-sm text-slate-600">
          {product.category}
        </div>

        <div className="col-span-1 text-sm font-medium text-slate-700">
          ₹{product.price}
        </div>

        <div className="col-span-1 text-sm font-medium text-slate-700">
          {product.stock}
        </div>

        <div className="col-span-1">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <div className="col-span-2 text-sm text-slate-500">
          {product.lastUpdated}
        </div>

        <div className="col-span-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdate(product)}
              aria-label={`Update stock for ${product.name}`}
              title="Update stock"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              <Pencil size={14} />
            </button>
            <Link
              to={`/pharmacist/products/${product.id}/edit`}
              aria-label={`Edit ${product.name}`}
              title="Edit medicine"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5F6F0] text-[#117F5E] hover:bg-[#D5F0E6]"
            >
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Card */}
      <div className="border-t border-slate-100 p-4 xl:hidden">

        <div className="flex items-start justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {product.name}
              </p>

              <p className="text-xs text-slate-400">
                {product.brand}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {product.category}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>

        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3">

          <div>
            <p className="text-xs text-slate-400">Price</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              ₹{product.price}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Stock</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {product.stock}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Updated</p>
            <p className="mt-1 text-xs font-medium text-slate-600">
              {product.lastUpdated}
            </p>
          </div>

        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdate(product)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            <Pencil size={16} />
            Update Stock
          </button>
          <Link
            to={`/pharmacist/products/${product.id}/edit`}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#E5F6F0] py-2.5 text-sm font-medium text-[#117F5E] hover:bg-[#D5F0E6]"
          >
            <ExternalLink size={16} />
            Edit Medicine
          </Link>
        </div>

      </div>
    </>
  );
};

export default InventoryRow;