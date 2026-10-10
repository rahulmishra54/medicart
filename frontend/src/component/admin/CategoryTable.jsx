import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category.js";
import api from "../../api/api.js";
import { useEffect } from "react";
const CategoryTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/admin/categories");

        dispatch(getAllCategories(response.data.categories));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [dispatch]);



  return (
    <div className="space-y-4">

      {/* Mobile Cards */}
      <div className="space-y-3 lg:hidden">
        {categories.map((category) => (
          <article key={category._id} className="min-w-0 rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words font-semibold text-[#17324D]">
                  {category.name}
                </h2>
                <p className="mt-1 break-words text-sm leading-5 text-[#718096]">
                  {category.description}
                </p>
              </div>
              <span
                data-active={category.active}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 data-[active=true]:bg-[#E5F6F0] data-[active=true]:text-[#117F5E]"
              >
                <span
                  data-active={category.active}
                  className="h-1.5 w-1.5 rounded-full bg-slate-400 data-[active=true]:bg-[#15966F]"
                ></span>
                {category.active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#EEF3F5] pt-3 text-sm">
              <div>
                <p className="text-xs text-[#94A3B8]">Products</p>
                <p className="mt-1 font-medium text-[#17324D]">{category.productCount}</p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8]">Created</p>
                <p className="mt-1 text-[#475569]">{category.createdAt}</p>
              </div>
            </div>

            <div className="mt-2 flex justify-end border-t border-[#EEF3F5] pt-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#EDF7FC] hover:text-[#237DA8]"
                  onClick={() => navigate(`/admin/Category/edit/${category._id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#E5F6F0] hover:text-[#15966F]"
                >
                  Power
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#64748B] hover:bg-red-50 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-xl border border-[#E2EDF1] bg-white lg:block">

        <table className="w-full min-w-[880px] text-left text-sm">

          <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
            <tr>
              <th className="px-5 py-4 font-semibold">
                Category
              </th>

              <th className="px-5 py-4 font-semibold">
                Description
              </th>

              <th className="px-5 py-4 font-semibold">
                Products
              </th>

              <th className="px-5 py-4 font-semibold">
                Status
              </th>

              <th className="px-5 py-4 font-semibold">
                Created
              </th>

              <th className="px-5 py-4 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {categories.map((category) => (
              <tr className="border-t border-[#EEF3F5] text-[#475569]" key={category._id}>
                <td className="px-5 py-4 font-semibold text-[#17324D]">
                  {category.name}
                </td>

              <td className="max-w-sm break-words px-5 py-4 text-[#718096]">
                {category.description}
              </td>

              <td className="px-5 py-4">
                {category.productCount}
              </td>

              <td className="px-5 py-4">

                <span
                  data-active={category.active}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 data-[active=true]:bg-[#E5F6F0] data-[active=true]:text-[#117F5E]"
                >
                  <span
                    data-active={category.active}
                    className="h-1.5 w-1.5 rounded-full bg-slate-400 data-[active=true]:bg-[#15966F]"
                  ></span>
                  {category.active ? "Active" : "Inactive "}
                </span>

              </td>

              <td className="whitespace-nowrap px-5 py-4">
                {category.createdAt}
              </td>

              <td className="px-5 py-3">

                <div className="flex items-center gap-1">

                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-[#64748B] hover:bg-[#EDF7FC] hover:text-[#237DA8]"
                    onClick={()=>{navigate(`/admin/Category/edit/${category._id}`)}}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-[#64748B] hover:bg-[#E5F6F0] hover:text-[#15966F]"
                  >
                    Power
                  </button>

                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-[#64748B] hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>

                </div>

              </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CategoryTable;