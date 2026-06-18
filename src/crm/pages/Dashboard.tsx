import { useEffect, useState } from "react";
import crmApi from "../../services/crmApi";
import Layout from "../components/Layout";

export default function Dashboard() {

  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    const res =
      await crmApi.get(
        "/dashboard/stats"
      );

    setStats(res.data);
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="font-semibold">
            Delayed Popup Leads
          </h2>

          <p className="text-3xl mt-2">
            {stats.delayedPopup || 0}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="font-semibold">
            Abroad Form Leads
          </h2>

          <p className="text-3xl mt-2">
            {stats.abroadForms || 0}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="font-semibold">
            Total Leads
          </h2>

          <p className="text-3xl mt-2">
            {stats.totalLeads || 0}
          </p>

        </div>

      </div>

    </Layout>
  );
}