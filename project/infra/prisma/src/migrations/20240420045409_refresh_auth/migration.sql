-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "is_reposted" SET DEFAULT false,
ALTER COLUMN "is_published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refresh_token" TEXT;
