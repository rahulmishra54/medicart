import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/user/Home.jsx";
import Medicines from "../pages/user/Medicines.jsx";
import Categories from "../component/user/Categories.jsx";
import Cart from "../pages/user/Cart.jsx";
import Wishlist from "../pages/user/Wishlist.jsx";
import Offers from "../component/user/Offers.jsx";
import Login from "../pages/Login.jsx";
import PharmacySignup from "../pages/pharmacySignup.jsx";
import Signup from "../pages/Signup.jsx";
import AddMedicine from "../pages/pharmisct/AddMedicine.jsx";
import EditMedicine from "../pages/pharmisct/EditMedicine.jsx";
import Inventory from "../pages/pharmisct/Inventory.jsx";
import OrderDetails from "../pages/pharmisct/OrderDetails.jsx";
import Orders from "../pages/pharmisct/Orders.jsx";
import PharmacistDashboard from "../pages/pharmisct/PharmacistDashboard.jsx";
import PharmacyProfile from "../pages/pharmisct/PharmacyProfile.jsx";
import PrescriptionDetailsPage from "../pages/pharmisct/PrescriptionDetailsPage.jsx";
import Prescriptions from "../pages/pharmisct/Prescriptions.jsx";
import Category from "../pages/admin/Category.jsx";
import CreateCategory from "../component/admin/CreateCategory.jsx";
import UpdateCategory from "../component/admin/UpdateCategory.jsx";
import PharmacistRegistrationSubmitted from "../pages/pharmisct/PharmacistRegistrationSubmited.jsx";
import PharmacyManagement from "../pages/admin/PharmacyManagement.jsx";
import MedicineManagement from "../pages/admin/MedicineManagement.jsx";
import Order from "../pages/user/Orders.jsx"
import UserManagement from "../pages/admin/UserManagement.jsx"

const RequirePharmacist = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "pharmacist") return <Navigate to="/" replace />;
  if (user.status && user.status !== "approved") {
    return <Navigate to="/pharmacist/registration-submitted" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/pharmacy/register" element={<PharmacySignup />} />
      <Route 
        path="/pharmacist"
        element={<RequirePharmacist><PharmacistDashboard /></RequirePharmacist>}
      />
      <Route
  path="/pharmacist/registration-submitted"
  element={<PharmacistRegistrationSubmitted />}
/>
      <Route path="/admin/Category" element={<Category />} />
      <Route path="/admin/pharmacies" element={<PharmacyManagement />} />
      <Route path="/admin/medicines" element={<MedicineManagement />} />
      <Route path="/admin/medicines/:medicineId/edit" element={<EditMedicine />} />
      <Route path="/admin/Category/create" element={<CreateCategory />} /><Route
  path="/admin/Category/edit/:categoryId"
  element={<UpdateCategory />}
/>
<Route path="/admin/users" element={<UserManagement />} />

      <Route path="/admin/categories" element={<Category />} />
      <Route path="/pharmacist/inventory" element={<RequirePharmacist><Inventory /></RequirePharmacist>} />
      <Route path="/pharmacist/products/new" element={<RequirePharmacist><AddMedicine /></RequirePharmacist>} />
      <Route path="/pharmacist/orders" element={<RequirePharmacist><Orders /></RequirePharmacist>} />
      <Route path="/pharmacist/orders/:orderId" element={<RequirePharmacist><OrderDetails /></RequirePharmacist>} />
      <Route path="/pharmacist/prescriptions" element={<RequirePharmacist><Prescriptions /></RequirePharmacist>} />
      

      <Route
        path="/pharmacist/prescriptions/:prescriptionId"
        element={<RequirePharmacist><PrescriptionDetailsPage /></RequirePharmacist>}
      />
      <Route path="/pharmacist/profile" element={<RequirePharmacist><PharmacyProfile /></RequirePharmacist>} />
    </Routes>
  );
}

export default AppRoutes;