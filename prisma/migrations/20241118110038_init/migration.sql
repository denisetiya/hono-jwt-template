-- CreateTable
CREATE TABLE "Token" (
    "refresh" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("refresh")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
