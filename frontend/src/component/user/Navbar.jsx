import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  LogOut,
  X,
  ChevronDown,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api.js";
import { logout } from "../../redux/authSlice.js";
import logo from "../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Medicines", path: "/Medicines" },
    { name: "Orders", path: "/Orders" },
  ];

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      setAccountOpen(false);
      navigate("/login");
    }
  }

  function getLinkStyle(path) {
    const active = location.pathname === path;

    return `border-b-2 py-2 text-sm font-medium transition ${
      active
        ? "border-[#18845b] text-[#18845b]"
        : "border-transparent text-slate-600 hover:text-[#18845b]"
    }`;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 lg:flex-nowrap lg:px-8">

        {/* Logo */}
        <Link to="/" className="order-1 shrink-0">
          <img
            src={logo}
            alt="MediCart"
            className="h-10 w-auto max-w-40 object-contain"
          />
        </Link>

        {/* Search */}
        <form
          onSubmit={(event) => event.preventDefault()}
          className="order-3 flex w-full min-w-0 lg:order-2 lg:flex-1"
        >
          <input
            type="search"
            placeholder="Search medicines"
            aria-label="Search medicines"
            className="h-11 min-w-0 flex-1 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-[#18845b] focus:bg-white"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex h-11 items-center justify-center rounded-r-lg bg-[#18845b] px-4 text-white transition hover:bg-[#126e4b]"
          >
            <Search size={19} />
          </button>
        </form>

        {/* Main Navigation */}
        <div className="order-4 hidden items-center gap-5 lg:order-3 lg:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={getLinkStyle(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Shopping and Account Actions */}
        <div className="order-2 ml-auto flex shrink-0 items-center gap-3 lg:order-4 lg:ml-0 lg:gap-4">

          {/* Wishlist */}
          <Link
            to="/Wishlist"
            aria-label="Wishlist"
            className="flex items-center gap-2 text-slate-600 transition hover:text-[#18845b]"
          >
            <Heart size={21} strokeWidth={1.8} />
            <span className="hidden xl:inline text-sm">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link
            to="/Cart"
            className="flex h-10 items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 text-sm font-medium text-[#126e4b] transition hover:bg-emerald-100"
          >
            <ShoppingCart size={19} strokeWidth={1.8} />
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* Account */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen(!accountOpen)}
              aria-expanded={accountOpen}
              aria-label="Account menu"
              className="flex h-10 items-center gap-2 rounded-lg px-1 text-slate-700 transition hover:bg-slate-50 sm:border sm:border-slate-200 sm:px-3"
            >
              <UserRound size={19} strokeWidth={1.8} />

              <span className="hidden max-w-24 truncate text-sm sm:inline">
                {user?.name || "Sign In"}
              </span>

              <ChevronDown
                size={15}
                className={`hidden transition-transform sm:block ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                {user ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="order-4 grid w-full grid-cols-1 border-t border-slate-100 pt-2 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "bg-emerald-50 text-[#18845b]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;