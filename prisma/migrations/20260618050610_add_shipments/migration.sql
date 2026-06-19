-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'CHECKED_IN', 'RECEIVING', 'CLOSED');

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "shipmentName" TEXT NOT NULL,
    "amazonId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'READY_TO_SHIP',
    "unitsExpected" INTEGER NOT NULL,
    "unitsReceived" INTEGER NOT NULL DEFAULT 0,
    "shippedAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentBox" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "boxNumber" INTEGER NOT NULL,
    "fbaLabel" TEXT NOT NULL,
    "trackingId" TEXT,
    "weightLb" DOUBLE PRECISION,

    CONSTRAINT "ShipmentBox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentBox" ADD CONSTRAINT "ShipmentBox_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
