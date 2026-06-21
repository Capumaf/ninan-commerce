import { prisma } from "@/lib/prisma";

function sumCosts(costs: any) {
  if (!costs) return 0;
  const fields = [
    "referralFeeUsd", "fbaFeeUsd", "returnProcessingFeeUsd", "ppcCostPerUnitUsd",
    "freightPerUnitUsd", "customsBrokerFeeUsd", "isfFilingFeeUsd", "drayagePerUnitUsd",
    "cargoInsuranceUsd", "dutiesUsd", "prepCostUsd", "labelingCostUsd",
    "inspectionUsd", "monthlyStorageUsd", "longtermStorageUsd",
  ];
  return fields.reduce((sum, f) => sum + (costs[f] || 0), 0);
}

function calcAcos(spend: number, sales: number) {
  if (sales === 0) return null;
  return (spend / sales) * 100;
}

export const ACOS_ALERT_THRESHOLD = 35;

export type Alert = { type: string; message: string; color: string };

export async function getAlerts(): Promise<Alert[]> {
  const products = await prisma.product.findMany({
    include: { inventory: true, amazonCosts: true,
      shipments: { include: { boxes: true } },
      campaigns: { include: { metrics: true } },
    },
  });

  const alerts: Alert[] = [];

  products.forEach((p) => {
    const totalSpend = p.campaigns.reduce((s, c) => s + c.metrics.reduce((s2, m) => s2 + m.spend, 0), 0);
    const totalSales = p.campaigns.reduce((s, c) => s + c.metrics.reduce((s2, m) => s2 + m.sales, 0), 0);
    const acos = calcAcos(totalSpend, totalSales);

    const stockLow = p.inventory
    ? p.inventory.unitsInFBA <= p.inventory.reorderPoint
    : false;
    const stockCritical = stockLow && (p.inventory?.unitsInTransit ?? 0) === 0;
    const acosHigh = acos !== null && acos > ACOS_ALERT_THRESHOLD;
    const shipmentMissingTracking = p.shipments.some((s) =>
      s.boxes.some((b) => !b.trackingId)
    );

    if (stockLow) {
     alerts.push({
     type: "stock",
      message: stockCritical
      ? `${p.name.trim()} — SIN STOCK y sin envío en camino (${p.inventory?.unitsInFBA ?? 0} en FBA)`
      : `${p.name.trim()} — stock bajo: ${p.inventory?.unitsInFBA ?? 0} unidades en FBA, ${p.inventory?.unitsInTransit ?? 0} en camino`,
     color: stockCritical ? "#ef4444" : "#f59e0b",
     });
     }
    if (acosHigh) {
      alerts.push({
        type: "acos",
        message: `${p.name.trim()} — ACOS alto: ${acos?.toFixed(1)}% (umbral: ${ACOS_ALERT_THRESHOLD}%)`,
        color: "#ef4444",
      });
    }
    if (shipmentMissingTracking) {
      alerts.push({
        type: "shipment",
        message: `${p.name.trim()} — shipment con tracking incompleto`,
        color: "#a78bfa",
      });
    }
  });

  return alerts;
}