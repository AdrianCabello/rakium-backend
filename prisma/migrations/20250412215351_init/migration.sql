-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'client_admin', 'client_user');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SiteType" AS ENUM ('BASIC', 'PREMIUM', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rakiumClientId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RakiumClient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "siteType" "SiteType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RakiumClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "rakiumClientId" TEXT NOT NULL,

    CONSTRAINT "FinalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "finalUserId" TEXT NOT NULL,
    "rakiumClientId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rakiumClientId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rakiumClientId" TEXT NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_rakiumClientId_idx" ON "User"("rakiumClientId");

-- CreateIndex
CREATE UNIQUE INDEX "RakiumClient_domain_key" ON "RakiumClient"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "RakiumClient_email_key" ON "RakiumClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FinalUser_email_key" ON "FinalUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FinalUser_userId_key" ON "FinalUser"("userId");

-- CreateIndex
CREATE INDEX "FinalUser_rakiumClientId_idx" ON "FinalUser"("rakiumClientId");

-- CreateIndex
CREATE INDEX "Appointment_finalUserId_idx" ON "Appointment"("finalUserId");

-- CreateIndex
CREATE INDEX "Appointment_rakiumClientId_idx" ON "Appointment"("rakiumClientId");

-- CreateIndex
CREATE INDEX "Schedule_rakiumClientId_idx" ON "Schedule"("rakiumClientId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_rakiumClientId_key" ON "SiteContent"("rakiumClientId");

-- CreateIndex
CREATE INDEX "SiteContent_rakiumClientId_idx" ON "SiteContent"("rakiumClientId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rakiumClientId_fkey" FOREIGN KEY ("rakiumClientId") REFERENCES "RakiumClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalUser" ADD CONSTRAINT "FinalUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalUser" ADD CONSTRAINT "FinalUser_rakiumClientId_fkey" FOREIGN KEY ("rakiumClientId") REFERENCES "RakiumClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_finalUserId_fkey" FOREIGN KEY ("finalUserId") REFERENCES "FinalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_rakiumClientId_fkey" FOREIGN KEY ("rakiumClientId") REFERENCES "RakiumClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_rakiumClientId_fkey" FOREIGN KEY ("rakiumClientId") REFERENCES "RakiumClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteContent" ADD CONSTRAINT "SiteContent_rakiumClientId_fkey" FOREIGN KEY ("rakiumClientId") REFERENCES "RakiumClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
