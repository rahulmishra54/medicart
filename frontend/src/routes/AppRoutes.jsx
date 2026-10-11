import { Route, Routes } from "react-router-dom";
import HeroSection from "../component/HeroSection.jsx";
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
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/pharmacy/register" element={<PharmacySignup />} />
      <Route 
        path="/pharmacist"
        element={<PharmacistDashboard />}
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

      <Route path="/admin/categories" element={<Category />} />
      <Route path="/pharmacist/inventory" element={<Inventory />} />
      <Route path="/pharmacist/products/new" element={<AddMedicine />} />
      <Route path="/pharmacist/orders" element={<Orders />} />
      <Route path="/pharmacist/orders/:orderId" element={<OrderDetails />} />
      <Route path="/pharmacist/prescriptions" element={<Prescriptions />} />
      <Route
        path="/pharmacist/prescriptions/:prescriptionId"
        element={<PrescriptionDetailsPage />}
      />
      <Route path="/pharmacist/profile" element={<PharmacyProfile />} />
    </Routes>
  );
}

export default AppRoutes;