import PharmistNavBar from "../../component/PharmistNavBar.jsx";
import Sidebar from "../../component/Sidebar.jsx";

const PharmacistLayout = ({ children }) => (
  <div className="min-h-screen bg-[#F5FAFC]">
    <PharmistNavBar />
    <div className="lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  </div>
);

export default PharmacistLayout;