import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";
import { Download, Eye, Search, Users, X } from "lucide-react";

export default function DelayedPopupLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await crmApi.get(
        `/delayed-popup/all?search=${search}&page=${page}&limit=10`
      );

      setLeads(res.data.data);
      setPages(res.data.pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, page]);

  const exportExcel = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "/api/delayed-popup/export",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const blob =
    await response.blob();

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "DelayedPopupLeads.xlsx";

  a.click();

  window.URL.revokeObjectURL(url);
};

return (
  <Layout>

    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

      <div>
        <h1 className="text-3xl font-bold text-black">
          Delayed Popup Leads
        </h1>

        <p className="text-gray-500 mt-1">
          Manage and track delayed popup enquiries
        </p>
      </div>

      <button
        onClick={exportExcel}
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-5
          py-3
          rounded-xl
          flex
          items-center
          gap-2
          font-medium
        "
      >
        <Download size={18} />
        Export Excel
      </button>

    </div>

    {/* Summary Card */}
    {/* <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-5 text-white mb-6">

      <div className="flex items-center gap-4">

        <div className="bg-white/20 p-3 rounded-xl">
          <Users size={28} />
        </div>

        <div>
          <p className="text-sm">
            Total Records
          </p>

          <h2 className="text-3xl font-bold">
            {leads.length}
          </h2>
        </div>

      </div>

    </div> */}

    {/* Search */}
    <div className="relative mb-6">

      <Search
        size={18}
        className="absolute left-4 top-4 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by name, mobile or service..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          pl-12
          pr-4
          py-3
          focus:ring-2
          focus:ring-blue-500
          outline-none
        "
      />

    </div>

    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto bg-white rounded-2xl border border-gray-200">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Mobile</th>
            <th className="p-4 text-left">Service</th>
            <th className="p-4 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{lead.id}</td>

                <td className="p-4 font-medium">
                  {lead.studentName}
                </td>

                <td className="p-4">
                  {lead.mobile}
                </td>

                <td className="p-4">
                  {lead.serviceRequired}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      setSelectedLead(lead)
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      inline-flex
                      items-center
                      gap-2
                    "
                  >
                    <Eye size={16} />
                    View
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10 text-gray-500"
              >
                No Leads Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">

      {leads.map((lead) => (

        <div
          key={lead.id}
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-4
            shadow-sm
          "
        >
          <div className="space-y-2">

            <p>
              <span className="font-semibold">
                Name:
              </span>{" "}
              {lead.studentName}
            </p>

            <p>
              <span className="font-semibold">
                Mobile:
              </span>{" "}
              {lead.mobile}
            </p>

            <p>
              <span className="font-semibold">
                Service:
              </span>{" "}
              {lead.serviceRequired}
            </p>

          </div>

          <button
            onClick={() =>
              setSelectedLead(lead)
            }
            className="
              mt-4
              w-full
              bg-blue-600
              text-white
              py-2
              rounded-lg
            "
          >
            View Details
          </button>

        </div>

      ))}

    </div>

    {/* Pagination */}
    <div className="flex flex-wrap justify-center items-center gap-3 mt-8">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
          px-4
          py-2
          rounded-lg
          bg-gray-100
          disabled:opacity-50
        "
      >
        Previous
      </button>

      <span className="font-medium">
        Page {page} of {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className="
          px-4
          py-2
          rounded-lg
          bg-blue-600
          text-white
          disabled:opacity-50
        "
      >
        Next
      </button>

    </div>

    {/* Modal */}
    {selectedLead && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl w-full max-w-xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Lead Details
            </h2>

            <button
              onClick={() =>
                setSelectedLead(null)
              }
            >
              <X
                size={24}
                className="text-red-600"
              />
            </button>

          </div>

          <div className="space-y-4">

            <div className="border-b pb-2">
              <strong>ID:</strong>{" "}
              {selectedLead.id}
            </div>

            <div className="border-b pb-2">
              <strong>Name:</strong>{" "}
              {selectedLead.studentName}
            </div>

            <div className="border-b pb-2">
              <strong>Mobile:</strong>{" "}
              {selectedLead.mobile}
            </div>

            <div className="border-b pb-2">
              <strong>Service:</strong>{" "}
              {selectedLead.serviceRequired}
            </div>

            <div>
              <strong>Created:</strong>{" "}
              {new Date(
                selectedLead.createdAt
              ).toLocaleString()}
            </div>

          </div>

        </div>

      </div>
    )}

  </Layout>
);
}