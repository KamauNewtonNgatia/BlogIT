-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_owner_fkey";

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
