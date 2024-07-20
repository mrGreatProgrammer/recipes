-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "altTxt" TEXT NOT NULL,
    "recepyId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recepy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cookTimer" TEXT NOT NULL,
    "kkal" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "totalWeight" DOUBLE PRECISION NOT NULL,
    "categories" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recepy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsRecepy" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION,
    "count" INTEGER,
    "ingredientId" INTEGER NOT NULL,
    "recepyId" INTEGER NOT NULL,

    CONSTRAINT "IngredientsRecepy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_recepyId_fkey" FOREIGN KEY ("recepyId") REFERENCES "Recepy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsRecepy" ADD CONSTRAINT "IngredientsRecepy_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsRecepy" ADD CONSTRAINT "IngredientsRecepy_recepyId_fkey" FOREIGN KEY ("recepyId") REFERENCES "Recepy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
