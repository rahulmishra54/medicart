import { Check, Eye, X } from "lucide-react";

const statusStyles = {
  approved: "bg-[#E5F6F0] text-[#117F5E]",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-700",
};

const PharmacyTable = ({ pharmacies, updatingPharmacyId, onView, onStatusChange }) => {
  const formatDate = (date) => date
    ? new Date(date).toLocaleDateString()
    : "Not provided";

  const renderStatus = (status) => (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {statusStyles[status] ? status : "Unrecognized status"}
    </span>
  );

  const renderActions = (pharmacy) => {
    const isUpdating = updatingPharmacyId === pharmacy._id;

    return (
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => onView(pharmacy._id)}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-[#237DA8] hover:bg-[#EDF7FC]"
        >
          <Eye size={16} aria-hidden="true" />
          View
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => {
            if (window.confirm(`Accept ${pharmacy.name}?`)) {
              onStatusChange(pharmacy, "approve");
            }
          }}
          className="inline-flex min-h-9 items-center gap-1 rounded-md px-2.5 text-sm font-medium text-[#117F5E] hover:bg-[#E5F6F0] disabled:opacity-50"
        >
          <Check size={15} aria-hidden="true" />
          Accept
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => {
            if (window.confirm(`Reject ${pharmacy.name}?`)) {
              onStatusChange(pharmacy, "reject");
            }
          }}
          className="inline-flex min-h-9 items-center gap-1 rounded-md px-2.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
        >
          <X size={15} aria-hidden="true" />
          Reject
        </button>
        {isUpdating && <span className="px-2 text-xs text-[#718096]">Updating...</span>}
      </div>
    );
  };

  if (pharmacies.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[#DCE7EA] px-4 py-10 text-center text-sm text-[#718096]">
        No pharmacies match this search and status.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {pharmacies.map((pharmacy) => (
          <article key={pharmacy._id} className="min-w-0 rounded-lg border border-[#E2EDF1] p-4">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <h2 className="break-words font-semibold text-[#17324D]">{pharmacy.name || "Unnamed pharmacy"}</h2>
              {renderStatus(pharmacy.status)}
            </div>
            <dl className="mt-3 grid min-w-0 grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div className="min-w-0"><dt className="text-xs text-[#718096]">Email</dt><dd className="break-all text-[#475569]">{pharmacy.email || "Not provided"}</dd></div>
              <div><dt className="text-xs text-[#718096]">Phone</dt><dd className="break-words text-[#475569]">{pharmacy.phone || "Not provided"}</dd></div>
              <div className="min-w-0"><dt className="text-xs text-[#718096]">Address</dt><dd className="break-words text-[#475569]">{pharmacy.address || "Not provided"}</dd></div>
              <div className="min-w-0"><dt className="text-xs text-[#718096]">License</dt><dd className="break-all text-[#475569]">{pharmacy.licenseNumber || "Not provided"}</dd></div>
              <div><dt className="text-xs text-[#718096]">Registered</dt><dd className="text-[#475569]">{formatDate(pharmacy.createdAt)}</dd></div>
            </dl>
            <div className="mt-3 border-t border-[#EEF3F5] pt-2">{renderActions(pharmacy)}</div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-[#E2EDF1] lg:block">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
            <tr>
              <th className="px-4 py-3 font-semibold">Pharmacy</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">License</th>
              <th className="px-4 py-3 font-semibold">Registration date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy._id} className="border-t border-[#EEF3F5] text-[#475569]">
                <td className="px-4 py-4 font-semibold text-[#17324D]">{pharmacy.name || "Unnamed pharmacy"}</td>
                <td className="px-4 py-4">
                  <p>{pharmacy.email || "Not provided"}</p>
                  <p className="mt-1 text-xs text-[#718096]">{pharmacy.phone || "Phone not provided"}</p>
                </td>
                <td className="px-4 py-4">{pharmacy.licenseNumber || "Not provided"}</td>
                <td className="whitespace-nowrap px-4 py-4">{formatDate(pharmacy.createdAt)}</td>
                <td className="px-4 py-4">{renderStatus(pharmacy.status)}</td>
                <td className="px-4 py-3">{renderActions(pharmacy)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PharmacyTable;
