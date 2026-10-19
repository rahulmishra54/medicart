
import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import PharmacistNavBar from "../../component/PharmistNavBar.jsx";
import api from "../../api/api.js";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Existing Admin Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="min-w-0 flex-1">
        {/* Existing Navbar */}
        <PharmacistNavBar />

        <main className="p-5 md:p-8">
          {/* Page Heading */}
          <div className="mb-7">
            <h1 className="mb-2 text-2xl font-bold text-[#0B3154]">
              Users
            </h1>

            <p className="text-sm text-gray-500">
              View all registered customers on MediCart.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6 w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#08A875] focus:ring-2 focus:ring-[#08A875]/10"
            />
          </div>

          {/* Customer List */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* List Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDF7F0]">
                  <Users size={21} className="text-[#08A875]" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#0B3154]">
                    Registered Customers
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {filteredUsers.length} customers found
                  </p>
                </div>
              </div>
            </div>

            {/* Users */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 border-b border-gray-100 p-5 last:border-b-0 transition hover:bg-gray-50"
                >
                  {/* Initial */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0] font-semibold text-[#087B58]">
                    {(user.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  {/* User Details */}
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[#0B3154]">
                      {user.name || "Unnamed User"}
                    </h3>

                    <p className="break-all text-sm text-gray-500">
                      {user.email || "No email available"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <Users
                  size={32}
                  className="mx-auto mb-3 text-gray-300"
                />

                <h3 className="font-semibold text-[#0B3154]">
                  No users found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try searching with another name.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
