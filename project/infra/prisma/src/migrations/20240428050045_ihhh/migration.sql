-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_notificationsId_fkey";

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "notified_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_notificationsId_fkey" FOREIGN KEY ("notificationsId") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
