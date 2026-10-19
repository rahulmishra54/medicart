import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryFilter from "../../component/InventoryFilter.jsx";
import InventoryHeader from "../../component/InventoryHeader.jsx";
import InventoryTable from "../../component/InventoryTable.jsx";
import InventoryStats from "../../component/InventoryStats.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";
import api from "../../api/api.js";
import UpdateStockModel from "../../component/UpdateStockModel.jsx";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryResponse = await api.get("/inventory");
        const medicines = inventoryResponse.data.medicines;

        if (!inventoryResponse.data.success || !Array.isArray(medicines)) {
          throw new Error("Inventory data is not available.");
        }

        const inventoryProducts = medicines.map((medicine) => ({
          ...medicine,
          id: medicine._id,
          stock: medicine.stockQuantity,
          category: medicine.category?.name || medicine.category,
          lastUpdated: medicine.updatedAt,
        }));
        setProducts(inventoryProducts);

        const statsResponse = await api.get("/inventory/stats");
        if (statsResponse.data.success && statsResponse.data.data) {
          setStats(statsResponse.data.data);
        } else {
          throw new Error(statsResponse.data.message || "Inventory statistics are not available.");
        }
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || "Unable to load inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "In Stock") return product.stock > 10;
    if (activeFilter === "Low Stock") return product.stock > 0 && product.stock <= 10;
    if (activeFilter === "Out of Stock") return product.stock === 0;
    return true;
  });

  const updateStock = async (updatedProduct) => {
    try {
      const response = await api.patch(`/inventory/${updatedProduct._id}/stock`, {
        stockQuantity: updatedProduct.stock,
      });

      if (!response.data.success || !response.data.medicine) {
        throw new Error(response.data.message || "Unable to update stock.");
      }

      const updatedMedicine = response.data.medicine;
      setProducts((currentProducts) => currentProducts.map((product) => (
        product._id === updatedMedicine._id
          ? {
            ...product,
            stock: updatedMedicine.stockQuantity,
            lastUpdated: updatedMedicine.updatedAt,
          }
          : product
      )));

      const statsResponse = await api.get("/inventory/stats");
      if (statsResponse.data.success && statsResponse.data.data) {
        setStats(statsResponse.data.data);
      } else {
        throw new Error(statsResponse.data.message || "Inventory statistics are not available.");
      }
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to update stock.");
    }
  };

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <InventoryHeader />
          <Link to="/pharmacist/products/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#15966F] px-4 text-sm font-semibold text-white hover:bg-[#117F5E]">Add medicine</Link>
        </div>
        {stats && <InventoryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} stats={stats} />}
        {loading && <p className="text-sm text-slate-500">Loading inventory...</p>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {stats && <InventoryStats stats={stats} />}
        {!loading && !error && <InventoryTable products={filteredProducts} onUpdate={setSelectedProduct} />}
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