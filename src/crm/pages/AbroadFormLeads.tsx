import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";
import { Download, Eye, Globe, Search, X } from "lucide-react";

export default function AbroadFormLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [search, page]);

  const loadData = async () => {
    const res = await crmApi.get(
      `/abroad-form/all?search=${search}&page=${page}&limit=10`
    );

    setLeads(res.data.data);
    setPages(res.data.pages);
  };

const exportExcel = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/abroad-form/export`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      "AbroadFormLeads.xlsx";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Export failed");
  }
};

  const [selectedLead, setSelectedLead] =
  useState<any>(null);

const [showModal, setShowModal] =
  useState(false);

return (
  <Layout>

    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-black">
            Abroad Form Leads
          </h1>

          <p className="text-gray-500 mt-1">
            Manage student admission and loan enquiries
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
            justify-center
            gap-2
            font-medium
            w-full
            lg:w-auto
          "
        >
          <Download size={18} />
          Export Excel
        </button>

      </div>

      {/* Summary Card */}
      {/* <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-6 text-white">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-2xl">
            <Globe size={30} />
          </div>

          <div>
            <p className="text-sm text-white/80">
              Records On Current Page
            </p>

            <h2 className="text-3xl font-bold">
              {leads.length}
            </h2>
          </div>

        </div>

      </div> */}

      {/* Search */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Name, Email, Mobile..."
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
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-2xl">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Admission</th>
              <th className="p-4 text-left">Loan Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {leads.length > 0 ? (
              leads.map((lead: any) => (

                <tr
                  key={lead.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {lead.id}
                  </td>

                  <td className="p-4 font-medium">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.email}
                  </td>

                  <td className="p-4">
                    {lead.mobile}
                  </td>

                  <td className="p-4">
                    {lead.country}
                  </td>

                  <td className="p-4">
                    {lead.admissionStatus}
                  </td>

                  <td className="p-4">
                    {lead.loanType}
                  </td>

                  <td className="p-4">
                    ₹ {lead.loanAmount?.toLocaleString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowModal(true);
                      }}
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
                  colSpan={9}
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

        {leads.map((lead: any) => (

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
                {lead.name}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {lead.email}
              </p>

              <p>
                <span className="font-semibold">
                  Mobile:
                </span>{" "}
                {lead.mobile}
              </p>

              <p>
                <span className="font-semibold">
                  Country:
                </span>{" "}
                {lead.country}
              </p>

              <p>
                <span className="font-semibold">
                  Amount:
                </span>{" "}
                ₹ {lead.loanAmount?.toLocaleString()}
              </p>

            </div>

            <button
              onClick={() => {
                setSelectedLead(lead);
                setShowModal(true);
              }}
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
      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            px-4
            py-2
            bg-gray-200
            rounded-lg
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
            bg-blue-600
            text-white
            rounded-lg
            disabled:opacity-50
          "
        >
          Next
        </button>

      </div>

    </div>

    {/* Modal */}
    {showModal && selectedLead && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl w-full max-w-3xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Lead Details
            </h2>

            <button
              onClick={() => setShowModal(false)}
            >
              <X
                size={24}
                className="text-red-600"
              />
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <strong>Name</strong>
              <p>{selectedLead.name}</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>{selectedLead.email}</p>
            </div>

            <div>
              <strong>Mobile</strong>
              <p>{selectedLead.mobile}</p>
            </div>

            <div>
              <strong>Country</strong>
              <p>{selectedLead.country}</p>
            </div>

            <div>
              <strong>Admission Status</strong>
              <p>{selectedLead.admissionStatus}</p>
            </div>

            <div>
              <strong>Loan Type</strong>
              <p>{selectedLead.loanType}</p>
            </div>

            <div>
              <strong>Loan Amount</strong>
              <p>
                ₹ {selectedLead.loanAmount?.toLocaleString()}
              </p>
            </div>

            <div>
              <strong>Created Date</strong>
              <p>
                {new Date(
                  selectedLead.createdAt
                ).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

      </div>

    )}

  </Layout>
);
}