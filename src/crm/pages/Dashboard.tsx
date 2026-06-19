import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";
import {
  Users,
  Globe,
  BarChart3,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await crmApi.get(
        "/dashboard/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Delayed Popup Leads",
      value: stats.delayedPopup || 0,
      icon: Users,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Abroad Form Leads",
      value: stats.abroadForms || 0,
      icon: Globe,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads || 0,
      icon: BarChart3,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to VSource CRM Management System
        </p>

      </div>

      {/* Welcome Banner */}
      {/* <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-6 md:p-8 text-white mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-white/90">
              Track leads, manage applications,
              and monitor CRM performance.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-2xl px-5 py-4">
            <p className="text-sm">
              Total Leads
            </p>

            <p className="text-3xl font-bold">
              {stats.totalLeads || 0}
            </p>
          </div>

        </div>

      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className={`
                ${card.bg}
                border border-gray-200
                rounded-2xl
                p-6
                hover:shadow-lg
                transition
              `}
            >
              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-600 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-black">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`
                    ${card.iconBg}
                    p-4
                    rounded-2xl
                  `}
                >
                  <Icon
                    size={28}
                    className={card.iconColor}
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CRM Overview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            CRM Overview
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Delayed Popup Leads
              </span>

              <span className="font-bold text-red-600">
                {stats.delayedPopup || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Abroad Form Leads
              </span>

              <span className="font-bold text-blue-600">
                {stats.abroadForms || 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Total Leads
              </span>

              <span className="font-bold text-black">
                {stats.totalLeads || 0}
              </span>
            </div>

          </div>

        </div>

        {/* Performance Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp
                size={24}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                CRM Performance
              </h3>

              <p className="text-gray-500 text-sm">
                Lead management status
              </p>
            </div>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-gray-600">
              Total Leads Managed
            </p>

            <p className="text-4xl font-bold mt-2 text-blue-600">
              {stats.totalLeads || 0}
            </p>

          </div>

        </div>

      </div>

    </Layout>
  );
}