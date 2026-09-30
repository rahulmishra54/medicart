import { useState } from 'react'

import './App.css'
import HeroSection from './component/HeroSection'
import Footer from './component/Footer.jsx'
import Login from "./component/Login.jsx"
import Signup from "./component/Signup.jsx"
import Comp from "./component/Comp.jsx"
import PharmistNavBar from './component/PharmistNavBar.jsx'
import AddProductImage from "./component/AddProductImage.jsx"
import PrescriptionDetails from "./component/PrescriptionDetails.jsx"
import InventoryTable from "./component/InventoryTable.jsx"
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PrescriptionDetails />
    
      
    </div>
  )
}

export default App
