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

export default function DashboardCharts() {
  const [itemChart, setItemChart] = useState({
    status_group: [],
    ins_group: [],
  });
  ChartJS.defaults.font.family =
    "Shabnam, IRANSansWeb, Vazirmatn, Tahoma, Arial, sans-serif";
  ChartJS.defaults.color = "rgba(255,255,255,0.9)";
  const barData = useMemo(() => {
    const labels = (itemChart?.status_group || []).map((i) => i.status_label);
    const data = (itemChart?.status_group || []).map(
      (i) => Number(i.count) || 0
    );
    return {
      labels,
      datasets: [
        {
          label: "تعداد",
          data,
          backgroundColor: "#ff6b5b",
          borderRadius: 8,
          barThickness: 24,
        },
      ],
    };
  }, [itemChart?.status_group]);

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
    const labels = (itemChart?.ins_group || []).map((i) => i.ins_label);
    // Use count as the value for each slice; sums will be shown in tooltip
    const data = (itemChart?.ins_group || []).map((i) => Number(i.count) || 0);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#ff6b5b",
            "#8b55ff",
            "#4cc9f0",
            "#06d6a0",
            "#ffd166",
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
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
              const count = ctx.parsed;
              const match = (itemChart?.ins_group || []).find(
                (i) => i.ins_label === label
              );
              const sum = match ? Number(match.sum) : 0;
              const formattedSum = sum.toLocaleString("fa-IR");
              const formattedCount = Number(count).toLocaleString("fa-IR");
              return `${label} - تعداد: ${formattedCount} - مبلغ: ${formattedSum}`;
            },
          },
        },
        title: { display: false },
      },
    }),
    [itemChart?.ins_group]
  );
  useEffect(() => {
    axiosClient
      .get(
        "/report/invoice/summery?summery_includes[0]=status&summery_includes[1]=ins"
      )
      .then((response) => {
        console.log(`response.data.data`, response.data.data);
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
