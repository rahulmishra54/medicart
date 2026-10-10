import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    const categoryData = {
      name: name.trim(),
      description: description.trim(),
      active: active,
    };

    console.log(categoryData);

    const createCategory = async () => {
      try {
        const response = await api.post(
          "/admin/categories",
          categoryData
        );

        console.log(response.data);

        if (response.status === 201) {
          navigate("/admin/Category");
        }
      } catch (error) {
        console.log(error);
      }
    };

    createCategory();
  };

  return (
    <div className="min-h-screen bg-[#F5FAFC] p-6">
      <div className="mx-auto max-w-2xl">

        <div>
          <p className="text-sm font-medium text-[#15966F]">
            Catalog management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#17324D]">
            Create Category
          </h1>

          <p className="mt-2 text-sm text-[#718096]">
            Add a new product category.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl bg-white p-6 shadow-sm"
        >

          {/* Category Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17324D]">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pain Relief"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/20"
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#17324D]">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/20"
            />
          </div>

          {/* Active Checkbox */}
          <div className="mt-5 flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 accent-[#15966F]"
            />

            <label
              htmlFor="active"
              className="text-sm font-medium text-[#17324D]"
            >
              Active Category
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 rounded-lg bg-[#15966F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#117F5E]"
          >
            Create Category
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateCategory;