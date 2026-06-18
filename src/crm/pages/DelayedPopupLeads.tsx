import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";

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
      "http://localhost:5000/api/delayed-popup/export",
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Delayed Popup Leads
        </h1>
        <button
  onClick={exportExcel}
  className="bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  Export Excel
</button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, mobile or service..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Service</th>
                 <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.length > 0 ? (
                leads.map((lead: any) => (
                  <tr key={lead.id}>
                    <td className="border p-2">{lead.id}</td>
                    <td className="border p-2">
                      {lead.studentName}
                    </td>
                    <td className="border p-2">
                      {lead.mobile}
                    </td>
                    <td className="border p-2">
                      {lead.serviceRequired}
                    </td>
                    <td className="border p-2">
  <button
    onClick={() => setSelectedLead(lead)}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    View
  </button>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-4"
                  >
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex gap-3 mt-5 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[500px] max-w-[95%]">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">
          Lead Details
        </h2>

        <button
          onClick={() => setSelectedLead(null)}
          className="text-red-600 font-bold"
        >
          X
        </button>
      </div>

      <div className="space-y-3">

        <p>
          <strong>ID:</strong> {selectedLead.id}
        </p>

        <p>
          <strong>Name:</strong> {selectedLead.studentName}
        </p>

        <p>
          <strong>Mobile:</strong> {selectedLead.mobile}
        </p>

        <p>
          <strong>Service:</strong> {selectedLead.serviceRequired}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(
            selectedLead.createdAt
          ).toLocaleString()}
        </p>

      </div>

    </div>
  </div>
)}
    </Layout>
  );
}