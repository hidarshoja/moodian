import { useEffect, useState, useMemo } from "react";
import axiosClient from "../axios-client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const statusColors = {
  "جدید": "#ffffff",
  "یافت نشده در مودیان": "#ff0000",
  "مشکل در تایید توسط مودیان": "#ff0000",
  "مشکل در ارسال به مودیان": "#ff0000",
  "در حال ارسال به مودیان": "#ffd166",
  "تایید شده توسط مودیان": "#06d6a0",
};

const insColors = {
  "اصلی": "#4cc9f0",
  "اصلاحی": "#06d6a0",
  "برگشت از فروش": "#8b55ff",
  "ابطالی": "#ff0000",
};


// Maps API status_group to Bar chart data
function buildBarData(statusGroup) {
  const labels = (statusGroup || []).map((item) => item.status_label);
  const counts = (statusGroup || []).map((item) => Number(item.count) || 0);
  const colors = labels.map((lbl) => statusColors[lbl] || "#999"); 
  return {
    labels,
    datasets: [
      {
        label: "تعداد",
        data: counts,
        backgroundColor: colors,
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };
}

// Maps API ins_group to Doughnut chart data
function buildDoughnutData(insGroup) {
  const labels = (insGroup || []).map((item) => item.ins_label);
  const counts = (insGroup || []).map((item) => Number(item.count) || 0);
  const colors = labels.map((lbl) => insColors[lbl] || "#ccc");
  return {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
}

export default function DashboardCharts() {
  const [itemChart, setItemChart] = useState({
    status_group: [],
    ins_group: [],
  });
  ChartJS.defaults.font.family =
    "Shabnam, IRANSansWeb, Vazirmatn, Tahoma, Arial, sans-serif";
  ChartJS.defaults.color = "rgba(255,255,255,0.9)";
  // Build chart data from API response in a simple, readable way
  const barData = useMemo(
    () => buildBarData(itemChart?.status_group),
    [itemChart?.status_group]
  );

  const barOptions = useMemo(
    () => ({
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "rgba(255,255,255,0.7)", precision: 0 },
          border: { color: "rgba(255,255,255,0.1)" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "rgba(255,255,255,0.9)" },
          border: { color: "rgba(255,255,255,0.1)" },
        },
      },
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          rtl: true,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} مورد`,
          },
        },
      },
    }),
    []
  );

  const doughnutData = useMemo(
    () => buildDoughnutData(itemChart?.ins_group),
    [itemChart?.ins_group]
  );

  // Precompute a simple lookup for sums by label for tooltip display
  const insSumByLabel = useMemo(() => {
    const map = new Map();
    (itemChart?.ins_group || []).forEach((item) => {
      map.set(item.ins_label, Number(item.sum) || 0);
    });
    return map;
  }, [itemChart?.ins_group]);

  const doughnutOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "58%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "rgba(255,255,255,0.9)",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          rtl: true,
          callbacks: {
            label: (ctx) => {
              const label = ctx.label || "";
              const count = Number(ctx.parsed) || 0;
              const sum = insSumByLabel.get(label) || 0;
              const formattedSum = sum.toLocaleString("fa-IR");
              const formattedCount = count.toLocaleString("fa-IR");
              return `${label} - تعداد: ${formattedCount} - مبلغ: ${formattedSum}`;
            },
          },
        },
        title: { display: false },
      },
    }),
    [insSumByLabel]
  );
  // Fetch chart data once from API and store it in state
  useEffect(() => {
    axiosClient
      .get(
        "/report/invoice/summery?summery_includes[0]=status&summery_includes[1]=ins"
      )
      .then((response) => {
      
        setItemChart(response.data.data || { status_group: [], ins_group: [] });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-64 lg:h-80 rounded-2xl bg-[#1f2241] border border-white/10 p-4">
        <div className="text-white/80 text-sm mb-2">گزارش وضعیت ارسال‌ها</div>
        <div className="h-[calc(100%-1rem)]">
          <Bar options={barOptions} data={barData} dir="rtl" />
        </div>
      </div>
      <div className="h-64 lg:h-80 rounded-2xl bg-[#1f2241] border border-white/10 p-4 flex items-center">
        <div className="w-full h-full">
          <Doughnut options={doughnutOptions} data={doughnutData} />
        </div>
      </div>
    </div>
  );
}
