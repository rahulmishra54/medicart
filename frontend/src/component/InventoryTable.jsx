import InventoryRow from "./InventoryRow";

const InventoryTable = ({ products = [], onUpdate }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Desktop Header */}
      <div className="hidden grid-cols-12 gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase text-slate-500 lg:grid">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Medicine</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-1">Price</div>
        <div className="col-span-1">Stock</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2">Last Updated</div>
        <div className="col-span-1">Action</div>
      </div>

      {products.map((product, index) => (
        <InventoryRow
          key={product.id}
          product={product}
          index={index}
          onUpdate={onUpdate}
        />
      ))}

    </div>
  );
};

export default InventoryTable;