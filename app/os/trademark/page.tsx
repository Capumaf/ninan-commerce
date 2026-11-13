import { prisma } from "@/lib/prisma";

const STATUS_LABEL: Record<string, string> = {
  PREPARING: "Preparing",
  FILED: "Filed",
  SPECIMEN_REQUESTED: "Specimen requested",
  OFFICE_ACTION: "Office action",
  PUBLISHED: "Published",
  REGISTERED: "Registered",
  ABANDONED: "Abandoned",
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function TrademarkPage() {
  const trademarks = await prisma.trademark.findMany({
    include: { events: { orderBy: { date: "desc" } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="p-4 md:p-10">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        Commerce OS · Brand
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8">
        Trademark <span className="font-semibold">Tracker</span>
      </h1>

      {trademarks.length === 0 && (
        <div className="text-center py-20 text-slate-600 text-sm">
          No trademarks tracked yet.
        </div>
      )}

      {trademarks.map((tm) => (
        <div key={tm.id} className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-4">
            <div className="bg-[#0a1220] px-6 py-5">
              <p className="text-xs text-slate-500 font-mono mb-1">Mark</p>
              <p className="text-2xl font-semibold text-white tracking-wide">
                {tm.mark}
              </p>
            </div>
            <div className="bg-[#0a1220] px-6 py-5">
              <p className="text-xs text-slate-500 font-mono mb-1">Status</p>
              <p className="text-lg text-amber-300">
                {STATUS_LABEL[tm.status] ?? tm.status}
              </p>
            </div>
            <div className="bg-[#0a1220] px-6 py-5">
              <p className="text-xs text-slate-500 font-mono mb-1">Attorney</p>
              <p className="text-sm text-slate-200">{tm.attorney ?? "—"}</p>
              <p className="text-xs text-slate-500 mt-1">
                Serial: {tm.serialNumber ?? "pending"}
              </p>
            </div>
          </div>

          {tm.nextAction && (
            <div
              className="px-4 py-3 rounded-xl text-sm mb-4"
              style={{
                background: "rgba(96,165,250,0.06)",
                border: "1px solid rgba(96,165,250,0.2)",
                color: "#bfdbfe",
              }}
            >
              <span className="font-mono text-xs uppercase text-blue-400 mr-2">
                Next
              </span>
              {tm.nextAction}
              {tm.nextActionDue && (
                <span className="text-blue-300"> · due {formatDate(tm.nextActionDue)}</span>
              )}
            </div>
          )}

          {tm.notes && <p className="text-xs text-slate-500 mb-6">{tm.notes}</p>}

          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">
            Timeline
          </h2>
          <div className="flex flex-col gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
            {tm.events.map((ev) => (
              <div key={ev.id} className="bg-[#0a1220] px-4 md:px-6 py-4">
                <p className="text-xs font-mono text-slate-500">{formatDate(ev.date)}</p>
                <p className="text-sm text-white mt-0.5">{ev.title}</p>
                {ev.notes && <p className="text-xs text-slate-400 mt-1">{ev.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
