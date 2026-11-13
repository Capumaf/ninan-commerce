-- CreateEnum
CREATE TYPE "TrademarkStatus" AS ENUM ('PREPARING', 'FILED', 'SPECIMEN_REQUESTED', 'OFFICE_ACTION', 'PUBLISHED', 'REGISTERED', 'ABANDONED');

-- CreateTable
CREATE TABLE "AmazonMonthlyStatement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "isPartial" BOOLEAN NOT NULL DEFAULT false,
    "salesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unitsSold" INTEGER,
    "promoRebatesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shippingCreditsUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fbaFeesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subscriptionUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amazonFeesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "couponFeesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "debtRecoveryUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "AmazonMonthlyStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trademark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mark" TEXT NOT NULL,
    "status" "TrademarkStatus" NOT NULL DEFAULT 'FILED',
    "attorney" TEXT,
    "serialNumber" TEXT,
    "filedAt" TIMESTAMP(3),
    "nextAction" TEXT,
    "nextActionDue" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Trademark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrademarkEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trademarkId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "TrademarkEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmazonMonthlyStatement_month_key" ON "AmazonMonthlyStatement"("month");

-- AddForeignKey
ALTER TABLE "TrademarkEvent" ADD CONSTRAINT "TrademarkEvent_trademarkId_fkey" FOREIGN KEY ("trademarkId") REFERENCES "Trademark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
