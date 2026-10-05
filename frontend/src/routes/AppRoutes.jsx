import { Route, Routes } from "react-router-dom";
import AddProduct from "../component/AddProduct.jsx";
import AddProductImages from "../component/AddProductImage.jsx";
import AllPrescription from "../component/AllPrescription.jsx";
import HeroSection from "../component/HeroSection.jsx";
import Login from "../component/Login.jsx";
import Signup from "../component/Signup.jsx";
import PharmacySignup from "../component/pharmacySignup.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/pharmacy/register" element={<PharmacySignup />} />
      <Route path="/pharmacist/products/new" element={<AddProduct />} />
      <Route
        path="/pharmacist/products/new/images"
        element={<AddProductImages />}
      />
      <Route
        path="/pharmacist/prescriptions"
        element={<AllPrescription />}
      />
    </Routes>
  );
}

export default AppRoutes;