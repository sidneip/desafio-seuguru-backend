/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `insurances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "insurances_name_key" ON "insurances"("name");
