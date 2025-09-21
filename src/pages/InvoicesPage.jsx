import { useState, useEffect } from "react";
import SendInvoicesTable from "../components/SendInvoicesTable";
import axiosClient from "../axios-client";
import Pagination from "../components/Pagination";

export default function InvoicesPage() {
  const [meta, setMeta] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [activeFilters] = useState({});

  const buildFilterQuery = (filters) => {
    const params = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "type") {
          params.push(`${key}=${value}`);
        } else {
          params.push(`f[${key}]=${encodeURIComponent(value)}`);
        }
      }
    });
    return params.length ? "&" + params.join("&") : "";
  };

  useEffect(() => {
    setLoading(true);
    const query = buildFilterQuery(activeFilters);
    axiosClient
      .get(`/invoices?page=${pageCount}${query}`)
      .then((response) => {
        setDataTable(response.data.data);
        setMeta(response.data.meta);
        console.log(`response.data.data`, response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, activeFilters, pageCount]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-white text-2xl font-bold">فاکتور فروش</h1>
          <p className="text-white/60 text-sm mt-1">
            نمای کلی فاکتور فروش کاربران
          </p>
        </div>
      </div>
      <div className="p-6">
        <SendInvoicesTable
          records={dataTable}
          loading={loading}
          onRefresh={() => setRefresh(!refresh)}
        />
      </div>
      <Pagination
        meta={meta}
        pageCount={pageCount}
        setPageCount={setPageCount}
        setLoading={setLoading}
      />
    </div>
  );
}
