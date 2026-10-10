import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api.js";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);

  // Get existing category
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await api.get(
          `/admin/categories/${categoryId}`
        );

        console.log(response.data);

        const category = response.data.category;

        setName(category.name);
        setDescription(category.description || "");
        setActive(category.active);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, [categoryId]);

  // Update category
  const handleSubmit = async (e) => {
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

    console.log("Category ID:", categoryId);
    console.log("Updated Category:", categoryData);

    try {
      const response = await api.patch(
        `/admin/categories/${categoryId}`,
        categoryData
      );

      console.log(response.data);

      if (response.status === 200) {
        navigate("/admin/Category");
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen bg-[#F5FAFC] p-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-[#15966F]">
            Catalog Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#17324D]">
            Update Category
          </h1>

          <p className="mt-2 text-sm text-[#718096]">
            Update the category name, description, and status.
          </p>
        </div>

        {/* Form */}
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
              placeholder="Enter category name"
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

          {/* Active / Inactive */}
          <div className="mt-5 rounded-lg border border-gray-200 p-4">

            <div className="flex items-center gap-3">

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

            <p className="mt-2 text-xs text-gray-500">
              {active
                ? "This category is currently active."
                : "This category is currently inactive."}
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => navigate("/admin/Category")}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#15966F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#117F5E]"
            >
              Update Category
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;