import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Globe,
  Users,
  LogOut,
} from "lucide-react";

export default function Layout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/crm/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Delayed Popup Leads",
      path: "/crm/delayed-popup",
      icon: Users,
    },
    {
      name: "Abroad Form Leads",
      path: "/crm/abroad-form",
      icon: Globe,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/crm/login";
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-white border-r border-gray-200
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo Area */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-red-600">
              VSource
            </h1>
            <p className="text-xs text-gray-500">
              CRM Management
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="text-black" size={24} />
          </button>
        </div>

        {/* Menu */}
        <div className="p-4">

          <p className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">
            Navigation
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    transition-all duration-200
                    font-medium
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Card */}
        <div className="absolute bottom-5 left-4 right-4">

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
            <p className="text-sm font-semibold text-black">
              Welcome Admin
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Manage leads and applications efficiently.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              py-3
              rounded-xl
              font-semibold
              flex items-center
              justify-center
              gap-2
              transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">

          <div className="h-16 px-4 md:px-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>

              <h2 className="text-lg md:text-xl font-bold text-black">
                CRM Dashboard
              </h2>

            </div>

            {/* <div className="flex items-center gap-3">

              <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  System Online
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                A
              </div>

            </div> */}

          </div>

        </header>

        {/* Content Area */}
        <main className="p-4 md:p-6 bg-gray-50 min-h-[calc(100vh-64px)]">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}