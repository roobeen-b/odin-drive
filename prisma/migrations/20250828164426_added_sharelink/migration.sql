-- CreateTable
CREATE TABLE "public"."ShareLink" (
    "id" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShareLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ShareLink" ADD CONSTRAINT "ShareLink_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
