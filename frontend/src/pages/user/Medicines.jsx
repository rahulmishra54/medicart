import Footer from "../../component/user/Footer.jsx";
import MedicineCatalog from "../../component/user/Medicines.jsx";
import Navbar from "../../component/user/Navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../api/api.js";
function Medicines() {
    const [medicines,setMedicines] = useState([]);
    useEffect(()=>{
      const fetchMedicines = async ()=>{
        try{
          const response = await api.get("/medicines/all-medicines");
          setMedicines(response.data.medicines);
          console.log(response.data.medicines);
        }catch(error){
          console.log(error)
        }
      }
      fetchMedicines();
},[])
  return (
    <div className="min-h-screen min-w-0 bg-white">
      <Navbar />
      <main>
       

       


        <MedicineCatalog medicines={medicines} />
      </main>
      <Footer />
    </div>
  );
}

export default Medicines;