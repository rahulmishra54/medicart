import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InventoryFilter from "../../component/InventoryFilter.jsx";
import InventoryHeader from "../../component/InventoryHeader.jsx";
import InventoryStats from "../../component/InventoryStats.jsx";
import InventoryTable from "../../component/InventoryTable.jsx";
import UpdateStockModel from "../../component/UpdateStockModel.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";
import logo from "../../assets/logo.png";

const initialProducts = [
  { id: "med-1", name: "Paracetamol 500 mg", brand: "Crocin", category: "Pain Relief", price: 32, stock: 48, lastUpdated: "Today", image: logo },
  { id: "med-2", name: "Azithromycin 500 mg", brand: "Azithral", category: "Antibiotic", price: 96, stock: 7, lastUpdated: "Yesterday", image: logo },
  { id: "med-3", name: "Vitamin D3 60,000 IU", brand: "Uprise-D3", category: "Supplements", price: 115, stock: 0, lastUpdated: "28 Sep 2026", image: logo },
  { id: "med-4", name: "Cetirizine 10 mg", brand: "Cetzine", category: "Allergy Care", price: 24, stock: 26, lastUpdated: "02 Oct 2026", image: logo },
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(
    () => products.filter((product) => {
      if (activeFilter === "In Stock") return product.stock > 10;
      if (activeFilter === "Low Stock") return product.stock > 0 && product.stock <= 10;
      if (activeFilter === "Out of Stock") return product.stock === 0;
      return true;
    }),
    [activeFilter, products],
  );

  const updateStock = (updatedProduct) => {
    setProducts((current) => current.map((product) => product.id === updatedProduct.id ? updatedProduct : product));
  };

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <InventoryHeader />
          <Link to="/pharmacist/products/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#15966F] px-4 text-sm font-semibold text-white hover:bg-[#117F5E]">Add medicine</Link>
        </div>
        <InventoryStats />
        <InventoryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <InventoryTable products={filteredProducts} onUpdate={setSelectedProduct} />
      </div>
      {selectedProduct && (
        <UpdateStockModel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={updateStock}
        />
      )}
    </PharmacistLayout>
  );
};

export default Inventory;