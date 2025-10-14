import { useMemo } from "react";
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

export default function DashboardCharts() {
  // Apply Shabnam font to charts
  ChartJS.defaults.font.family =
    "Shabnam, IRANSansWeb, Vazirmatn, Tahoma, Arial, sans-serif";
  ChartJS.defaults.color = "rgba(255,255,255,0.9)";
  // Fake data (replace later with API data)
  const barData = useMemo(() => {
    return {
      labels: ["تعداد ابطال", "تعداد خطا از سامانه", "تعداد ارسال موفق"],
      datasets: [
        {
          label: "تعداد",
          data: [3, 1, 8],
          backgroundColor: "#ff6b5b",
          borderRadius: 8,
          barThickness: 24,
        },
      ],
    };
  }, []);

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

  const doughnutData = useMemo(() => {
    return {
      labels: ["اصلی", "خالص"],
      datasets: [
        {
          data: [139955550212, 119955430312],
          backgroundColor: ["#ff6b5b", "#8b55ff"],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  }, []);

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
            label: (ctx) => `${ctx.label} : ${ctx.formattedValue.toString()}`,
          },
        },
        title: { display: false },
      },
    }),
    []
  );

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
