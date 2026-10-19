import Category from "./Category.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

function Categories() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Category showAll />
      </main>
      <Footer />
    </div>
  );
}

export default Categories;