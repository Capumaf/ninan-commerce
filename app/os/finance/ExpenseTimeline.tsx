"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ExpenseTimelineProps = {
  data: { month: string; amount: number }[];
};

export default function ExpenseTimeline({ data }: ExpenseTimelineProps) {
  if (data.length === 0) return null;

  return (
    <div className="bg-[#0a1220] border border-white/5 rounded-xl p-4 md:p-6 mb-8">
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
        Spending Over Time
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "#0a1220",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
            formatter={(value) => `$${Number(value).toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={{ fill: "#60a5fa", r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}