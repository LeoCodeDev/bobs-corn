/*
  Warnings:

  - You are about to drop the column `created_at` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `queue_id` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the `client_ips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_queues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "client_ips" DROP CONSTRAINT "client_ips_client_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_queues" DROP CONSTRAINT "purchase_queues_client_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_client_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_queue_id_fkey";

-- DropIndex
DROP INDEX "purchases_ip_address_purchase_time_idx";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "created_at",
DROP COLUMN "queue_id",
DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "client_ips";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "purchase_queues";
