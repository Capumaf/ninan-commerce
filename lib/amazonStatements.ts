import type { AmazonMonthlyStatement } from "@prisma/client";

export function statementFees(s: AmazonMonthlyStatement) {
  return (
    s.fbaFeesUsd +
    s.subscriptionUsd +
    s.amazonFeesUsd +
    s.couponFeesUsd +
    s.promoRebatesUsd
  );
}

// Operating result of the month: what sales brought in minus everything Amazon charged.
// Debt recovery is excluded: it is a card payment covering a negative balance, not income.
export function statementNet(s: AmazonMonthlyStatement) {
  return s.salesUsd + s.shippingCreditsUsd - statementFees(s);
}

export function summarizeStatements(statements: AmazonMonthlyStatement[]) {
  return statements.reduce(
    (acc, s) => ({
      sales: acc.sales + s.salesUsd + s.shippingCreditsUsd,
      fees: acc.fees + statementFees(s),
      net: acc.net + statementNet(s),
      debtRecovery: acc.debtRecovery + s.debtRecoveryUsd,
    }),
    { sales: 0, fees: 0, net: 0, debtRecovery: 0 }
  );
}

export function formatMonth(month: Date) {
  return new Date(month).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
