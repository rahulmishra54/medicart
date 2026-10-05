import {
  X,
  Copy,
  UserRound,
  ClipboardList,
  MessageSquare,
  Check,
  XCircle,
} from "lucide-react";

import logo from "../assets/logo.png";

const PrescriptionDetails = () => {
  return (
    <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between gap-4">

        <h2 className="min-w-0 text-2xl font-bold text-gray-900 sm:text-3xl">
          Prescription Details
        </h2>

        <button
          className="shrink-0 rounded-lg p-1 text-gray-700 transition hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={28} />
        </button>

      </div>


      {/* ================= PRESCRIPTION INFORMATION ================= */}
      <div className="mt-6 space-y-5">

        {/* Order ID */}
        <div className="grid grid-cols-[110px_minmax(0,1fr)_28px] items-center gap-3 sm:grid-cols-[150px_minmax(0,1fr)_28px]">

          <span className="text-sm text-gray-800 sm:text-base">
            Order ID
          </span>

          <strong className="min-w-0 break-words text-sm font-bold text-gray-900 sm:text-base">
            #MC1024
          </strong>

          <button className="shrink-0 text-gray-800 hover:text-blue-600">
            <Copy size={24} />
          </button>

        </div>


        {/* Prescription ID */}
        <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">

          <span className="text-sm text-gray-800 sm:text-base">
            Prescription ID
          </span>

          <strong className="min-w-0 break-words text-sm font-bold text-gray-900 sm:text-base">
            PR-1024
          </strong>

        </div>


        {/* Date */}
        <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">

          <span className="text-sm text-gray-800 sm:text-base">
            Date
          </span>

          <strong className="min-w-0 break-words text-sm font-bold text-gray-900 sm:text-base">
            28 Sep 2026, 10:30 AM
          </strong>

        </div>


        {/* Status */}
        <div className="flex justify-end">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-medium text-pink-600">
            Pending
          </span>

        </div>

      </div>


      {/* ================= CUSTOMER INFORMATION ================= */}
      <section className="mt-6 rounded-2xl bg-[#F0FBF7] px-4 py-5 sm:px-5">

        {/* Heading */}
        <div className="mb-5 flex items-center gap-3">

          <UserRound
            size={23}
            className="shrink-0 text-gray-900"
          />

          <h3 className="text-xl font-bold text-gray-900">
            Customer Information
          </h3>

        </div>


        {/* Customer Details */}
        <div className="space-y-4">

          {/* Name */}
          <div className="grid grid-cols-[75px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">

            <span className="text-sm text-gray-800 sm:text-base">
              Name
            </span>

            <span className="min-w-0 break-words text-sm text-gray-900 sm:text-base">
              Rahul Mishra
            </span>

          </div>


          {/* Phone */}
          <div className="grid grid-cols-[75px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">

            <span className="text-sm text-gray-800 sm:text-base">
              Phone
            </span>

            <span className="min-w-0 break-words text-sm text-gray-900 sm:text-base">
              +91 98765 43210
            </span>

          </div>


          {/* Address */}
          <div className="grid grid-cols-[75px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">

            <span className="text-sm text-gray-800 sm:text-base">
              Address
            </span>

            <span className="min-w-0 break-words text-sm text-gray-900 sm:text-base">
              Sector 62, Noida, Uttar Pradesh 201309
            </span>

          </div>

        </div>

      </section>


      {/* ================= PRESCRIPTION IMAGE ================= */}
      <section className="mt-6">

        {/* Heading */}
        <div className="mb-3 flex items-center gap-3">

          <ClipboardList
            size={24}
            className="shrink-0 text-gray-900"
          />

          <h3 className="text-lg font-medium text-gray-900">
            Prescription Image
          </h3>

        </div>


        {/* Image Container */}
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 sm:h-[400px]">

          <img
            src={logo}
            alt="Uploaded prescription"
            className="h-full w-full object-contain"
          />

        </div>

      </section>


      {/* ================= PRESCRIBED MEDICINES ================= */}
      <section className="mt-6">

        {/* Heading */}
        <div className="mb-4 flex items-center gap-3">

          <ClipboardList
            size={24}
            className="shrink-0 text-gray-900"
          />

          <h3 className="text-lg font-bold text-gray-900">
            Prescribed Medicines
          </h3>

        </div>


        {/* Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">

          <table className="w-full min-w-[400px] border-collapse">

            <thead>
              <tr className="bg-gray-50 text-left">

                <th className="w-[60px] px-4 py-3 text-sm font-semibold text-gray-700 sm:w-[80px] sm:px-5">
                  #
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-700 sm:px-5">
                  Medicine
                </th>

              </tr>
            </thead>


            <tbody>

              <tr className="border-t border-gray-200">

                <td className="px-4 py-3 text-sm text-gray-800 sm:px-5">
                  1
                </td>

                <td className="px-4 py-3 text-sm text-gray-900 sm:px-5">
                  Azithromycin 500 mg
                </td>

              </tr>


              <tr className="border-t border-gray-200">

                <td className="px-4 py-3 text-sm text-gray-800 sm:px-5">
                  2
                </td>

                <td className="px-4 py-3 text-sm text-gray-900 sm:px-5">
                  Paracetamol 650 mg
                </td>

              </tr>


              <tr className="border-t border-gray-200">

                <td className="px-4 py-3 text-sm text-gray-800 sm:px-5">
                  3
                </td>

                <td className="px-4 py-3 text-sm text-gray-900 sm:px-5">
                  Vitamin D3 60,000 IU
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>


      {/* ================= REMARKS ================= */}
      <section className="mt-6">

        {/* Heading */}
        <div className="mb-3 flex items-center gap-2">

          <MessageSquare
            size={22}
            className="shrink-0 text-gray-700"
          />

          <h3 className="text-base font-medium text-gray-900">
            Remarks{" "}
            <span className="text-gray-500">
              (Optional)
            </span>
          </h3>

        </div>


        {/* Textarea */}
        <textarea
          placeholder="Add remarks here..."
          className="h-[100px] w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-green-500"
        />

      </section>


      {/* ================= ACTIONS ================= */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">

        {/* Reject */}
        <button className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-6 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">

          <XCircle size={20} />

          Reject

        </button>


        {/* Approve */}
        <button className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-green-700">

          <Check size={20} />

          Approve

        </button>

      </div>

    </div>
  );
};

export default PrescriptionDetails;