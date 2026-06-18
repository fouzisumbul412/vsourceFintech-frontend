import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          VSource CRM
        </h1>

        <div className="space-y-3">

          <Link
            to="/crm/dashboard"
            className="block hover:text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            to="/crm/delayed-popup"
            className="block hover:text-blue-400"
          >
            Delayed Popup Leads
          </Link>

          <Link
            to="/crm/abroad-form"
            className="block hover:text-blue-400"
          >
            Abroad Form Leads
          </Link>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">

        <div className="bg-white p-4 shadow">

          <div className="flex justify-between">

            <h2 className="font-bold">
              CRM Panel
            </h2>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/crm/login";
              }}
            >
              Logout
            </button>

          </div>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}