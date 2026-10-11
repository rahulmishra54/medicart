import { Link } from "react-router-dom";
import AddProduct from "../../component/AddProduct.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";

const AddMedicine = () => {
  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[#64748B]">Inventory / Add medicine</p>
            <h1 className="mt-1 text-2xl font-bold text-[#17324D]">Add a medicine</h1>
          </div>
          <Link to="/pharmacist/inventory" className="text-sm font-semibold text-[#15966F] hover:underline">
            Back to inventory
          </Link>
        </div>
        <AddProduct />
      </div>
    </PharmacistLayout>
  );
};

export default AddMedicine;