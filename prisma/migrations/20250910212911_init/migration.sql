-- CreateEnum
CREATE TYPE "public"."Plant" AS ENUM ('PM', 'SSD', 'CHU');

-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('QCD', 'SCD', 'RDD', 'MMD', 'ADD', 'ADDIT', 'EQD', 'CSD', 'ADEHS', 'AD', 'HRD', 'FD');

-- CreateEnum
CREATE TYPE "public"."PayrollType" AS ENUM ('CATORCENAL', 'SEMANAL');

-- CreateEnum
CREATE TYPE "public"."Source" AS ENUM ('BESTJOBS', 'IMPRO');

-- CreateEnum
CREATE TYPE "public"."TransportType" AS ENUM ('PROPIO', 'RUTA');

-- CreateEnum
CREATE TYPE "public"."CollarType" AS ENUM ('BLUECOLLAR', 'WHITECOLLAR', 'GREYCOLLAR');

-- CreateEnum
CREATE TYPE "public"."TransportRoute" AS ENUM ('RUTA_1', 'RUTA_2', 'RUTA_3');

-- CreateEnum
CREATE TYPE "public"."TransportStop" AS ENUM ('PARADA_1', 'PARADA_2', 'PARADA_3');

-- CreateTable
CREATE TABLE "public"."Position" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "department" "public"."Department" NOT NULL,
    "dailySalary" DOUBLE PRECISION NOT NULL,
    "isFilled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employee" (
    "id" SERIAL NOT NULL,
    "payrollNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "shift" TEXT NOT NULL,
    "nss" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "curp" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "plant" "public"."Plant" NOT NULL,
    "department" "public"."Department" NOT NULL,
    "dailySalary" DOUBLE PRECISION NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "payrollType" "public"."PayrollType" NOT NULL,
    "source" "public"."Source" NOT NULL,
    "transportRoute" "public"."TransportRoute" NOT NULL,
    "transportStop" "public"."TransportStop" NOT NULL,
    "costCenter" TEXT NOT NULL,
    "transportType" "public"."TransportType" NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "collarType" "public"."CollarType" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_payrollNumber_key" ON "public"."Employee"("payrollNumber");

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
