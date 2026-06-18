-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('RESEARCHING', 'SAMPLING', 'APPROVED', 'REJECTED', 'ACTIVE', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "Incoterm" AS ENUM ('FOB', 'EXW', 'DDP', 'CIF', 'DAP', 'FCA');

-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('CONTACTED', 'SAMPLING', 'NEGOTIATING', 'APPROVED', 'REJECTED', 'BACKUP');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'RESEARCHING',
    "referenceUrl" TEXT,
    "imageUrl" TEXT,
    "asin" TEXT,
    "amazonUrl" TEXT,
    "material" TEXT,
    "color" TEXT,
    "useCase" TEXT,
    "lengthCm" DOUBLE PRECISION,
    "widthCm" DOUBLE PRECISION,
    "heightCm" DOUBLE PRECISION,
    "weightGrams" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "sourceUrl" TEXT,
    "sourcePlatform" TEXT,
    "country" TEXT,
    "incoterm" "Incoterm",
    "unitPrice" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'USD',
    "moq" INTEGER,
    "leadTimeDays" INTEGER,
    "unitsPerCarton" INTEGER,
    "cartonLengthCm" DOUBLE PRECISION,
    "cartonWidthCm" DOUBLE PRECISION,
    "cartonHeightCm" DOUBLE PRECISION,
    "cartonWeightKg" DOUBLE PRECISION,
    "sampleNotes" TEXT,
    "qualityNotes" TEXT,
    "negotiationNotes" TEXT,
    "generalNotes" TEXT,
    "status" "SupplierStatus" NOT NULL DEFAULT 'CONTACTED',

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmazonCostOperation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "label" TEXT DEFAULT 'Base Estimate',
    "referralFeeUsd" DOUBLE PRECISION,
    "fbaFeeUsd" DOUBLE PRECISION,
    "returnProcessingFeeUsd" DOUBLE PRECISION,
    "targetAcosPct" DOUBLE PRECISION,
    "estimatedCpc" DOUBLE PRECISION,
    "estimatedCvr" DOUBLE PRECISION,
    "ppcCostPerUnitUsd" DOUBLE PRECISION,
    "freightPerUnitUsd" DOUBLE PRECISION,
    "customsBrokerFeeUsd" DOUBLE PRECISION,
    "isfFilingFeeUsd" DOUBLE PRECISION,
    "drayagePerUnitUsd" DOUBLE PRECISION,
    "cargoInsuranceUsd" DOUBLE PRECISION,
    "dutiesUsd" DOUBLE PRECISION,
    "dutyRatePct" DOUBLE PRECISION,
    "prepCostUsd" DOUBLE PRECISION,
    "labelingCostUsd" DOUBLE PRECISION,
    "inspectionUsd" DOUBLE PRECISION,
    "monthlyStorageUsd" DOUBLE PRECISION,
    "longtermStorageUsd" DOUBLE PRECISION,
    "sampleCostUsd" DOUBLE PRECISION,
    "photographyUsd" DOUBLE PRECISION,
    "miscCostUsd" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "AmazonCostOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmazonCostOperation" ADD CONSTRAINT "AmazonCostOperation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
