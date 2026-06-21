"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ExpenseChartProps = {
  data: { category: string; amount: number }[];
};

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
  "#fb923c",
  "#22d3ee",
  "#f472b6",
  "#94a3b8",
];

export default function ExpenseChart({ data }: ExpenseChartProps) {
  if (data.length === 0) return null;

  return (
    <div className="bg-[#0a1220] border border-white/5 rounded-xl p-4 md:p-6 mb-8">
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
        Spending by Category
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
  data={data}
  dataKey="amount"
  nameKey="category"
  cx="50%"
  cy="50%"
  outerRadius={100}
>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0a1220",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
            formatter={(value) => `$${Number(value).toFixed(2)}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}