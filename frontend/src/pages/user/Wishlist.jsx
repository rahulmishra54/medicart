import Footer from "../../component/user/Footer.jsx";
import MedicineCatalog from "../../component/user/Medicines.jsx";
import Navbar from "../../component/user/Navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../api/api.js";
function Wishlist() {
    const [medicines,setMedicines] = useState([]);
 useEffect(() => {
  const fetchWishlist = async () => {
    try {
      const response = await api.get("/wishlist/");
      console.log(response.data.wishlistItems)
    
      console.log("Wishlist data:", response.data.wishlistItems);

      setMedicines(response.data.wishlistItems);
    } catch (error) {
      console.error("Wishlist fetch error:", error.response?.data || error.message);
    }
  };

  fetchWishlist();
}, []);

const data = medicines.map((wishlistItem) => wishlistItem.medicine);
  return (
    <div className="min-h-screen min-w-0 bg-white">
      <Navbar />
      <main>
       

       


        <MedicineCatalog medicines={data} />
      </main>
      <Footer />
    </div>
  );
}

export default Wishlist;