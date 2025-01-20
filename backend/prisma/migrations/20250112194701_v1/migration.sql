-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "first_seen" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_ips" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "last_seen" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_ips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "queue_id" TEXT,
    "purchase_time" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_queues" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "processed_count" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "next_process_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_queues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "client_ips_ip_address_idx" ON "client_ips"("ip_address");

-- CreateIndex
CREATE UNIQUE INDEX "client_ips_client_id_ip_address_key" ON "client_ips"("client_id", "ip_address");

-- CreateIndex
CREATE INDEX "purchases_client_id_purchase_time_idx" ON "purchases"("client_id", "purchase_time");

-- CreateIndex
CREATE INDEX "purchases_ip_address_purchase_time_idx" ON "purchases"("ip_address", "purchase_time");

-- CreateIndex
CREATE INDEX "purchase_queues_status_next_process_time_idx" ON "purchase_queues"("status", "next_process_time");

-- AddForeignKey
ALTER TABLE "client_ips" ADD CONSTRAINT "client_ips_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "purchase_queues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_queues" ADD CONSTRAINT "purchase_queues_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
