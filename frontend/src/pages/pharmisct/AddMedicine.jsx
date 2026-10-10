import { Link, useLocation } from "react-router-dom";
import AddProduct from "../../component/AddProduct.jsx";
import AddProductImages from "../../component/AddProductImage.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";

const AddMedicine = () => {
  const { pathname } = useLocation();
  const imagesStep = pathname.endsWith("/images");

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[#64748B]">Inventory / {imagesStep ? "Product images" : "Add medicine"}</p>
            <h1 className="mt-1 text-2xl font-bold text-[#17324D]">{imagesStep ? "Add product images" : "Add a medicine"}</h1>
          </div>
          <Link to={imagesStep ? "/pharmacist/products/new" : "/pharmacist/inventory"} className="text-sm font-semibold text-[#15966F] hover:underline">
            {imagesStep ? "Back to product details" : "Back to inventory"}
          </Link>
        </div>
        {imagesStep ? <AddProductImages /> : <AddProduct />}
        {!imagesStep && (
          <div className="mt-4 flex justify-end">
            <Link to="/pharmacist/products/new/images" className="rounded-lg border border-[#15966F] px-4 py-2.5 text-sm font-semibold text-[#117F5E] hover:bg-[#E5F6F0]">Continue to product images</Link>
          </div>
        )}
      </div>
    </PharmacistLayout>
  );
};

export default AddMedicine;