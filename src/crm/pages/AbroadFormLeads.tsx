import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";

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

  const exportExcel = () => {
    const token = localStorage.getItem("token");

    window.open(
      `${
        import.meta.env.VITE_API_URL
      }/abroad-form/export?token=${token}`,
      "_blank"
    );
  };
  const [selectedLead, setSelectedLead] =
  useState<any>(null);

const [showModal, setShowModal] =
  useState(false);

  return (
    <Layout>
      <div className="p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">

          <h1 className="text-2xl font-bold">
            Abroad Form Leads
          </h1>

          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>

        </div>

        <input
          type="text"
          placeholder="Search Name, Email, Mobile..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full mb-4"
        />

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200">

            <thead className="bg-gray-100">

              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Admission</th>
                <th className="border p-2">Loan Type</th>
                <th className="border p-2">Loan Amount</th>
                <th className="border p-2">
  Action
</th>
              </tr>

            </thead>

            <tbody>

              {leads.map((lead: any) => (
                <tr key={lead.id}>

                  <td className="border p-2">
                    {lead.id}
                  </td>

                  <td className="border p-2">
                    {lead.name}
                  </td>

                  <td className="border p-2">
                    {lead.email}
                  </td>

                  <td className="border p-2">
                    {lead.mobile}
                  </td>

                  <td className="border p-2">
                    {lead.country}
                  </td>

                  <td className="border p-2">
                    {lead.admissionStatus}
                  </td>

                  <td className="border p-2">
                    {lead.loanType}
                  </td>

                  <td className="border p-2">
                    ₹ {lead.loanAmount?.toLocaleString()}
                  </td>
                  <td className="border p-2">

  <button
    onClick={() => {
      setSelectedLead(lead);
      setShowModal(true);
    }}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    View
  </button>

</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="flex justify-center items-center gap-4 mt-5">

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
      {showModal && selectedLead && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Lead Details
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-red-600 font-bold"
        >
          X
        </button>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <strong>Name:</strong>
          <br />
          {selectedLead.name}
        </div>

        <div>
          <strong>Email:</strong>
          <br />
          {selectedLead.email}
        </div>

        <div>
          <strong>Mobile:</strong>
          <br />
          {selectedLead.mobile}
        </div>

        <div>
          <strong>Country:</strong>
          <br />
          {selectedLead.country}
        </div>

        <div>
          <strong>Admission Status:</strong>
          <br />
          {selectedLead.admissionStatus}
        </div>

        <div>
          <strong>Loan Type:</strong>
          <br />
          {selectedLead.loanType}
        </div>

        <div>
          <strong>Loan Amount:</strong>
          <br />
          ₹ {selectedLead.loanAmount?.toLocaleString()}
        </div>

        <div>
          <strong>Created Date:</strong>
          <br />
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