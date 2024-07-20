/*
  Warnings:

  - You are about to drop the column `categories` on the `Recepy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recepy" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "CategoriesResepe" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION,
    "count" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "recepyId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesResepe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoriesResepe" ADD CONSTRAINT "CategoriesResepe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesResepe" ADD CONSTRAINT "CategoriesResepe_recepyId_fkey" FOREIGN KEY ("recepyId") REFERENCES "Recepy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
