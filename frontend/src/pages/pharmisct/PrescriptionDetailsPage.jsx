import { Link } from "react-router-dom";
import PrescriptionDetails from "../../component/PrescriptionDetails.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";

const PrescriptionDetailsPage = () => (
  <PharmacistLayout>
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <Link to="/pharmacist/prescriptions" className="mb-4 inline-flex text-sm font-medium text-[#15966F] hover:underline">← All prescriptions</Link>
      <PrescriptionDetails />
    </div>
  </PharmacistLayout>
);

export default PrescriptionDetailsPage;