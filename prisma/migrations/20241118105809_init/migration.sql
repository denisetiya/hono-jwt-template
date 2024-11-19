-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "nama" STRING NOT NULL,
    "username" STRING NOT NULL,
    "email" STRING NOT NULL,
    "noHp" STRING,
    "password" STRING NOT NULL,
    "imgUrl" STRING,
    "role" STRING NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alamat" (
    "id" STRING NOT NULL,
    "idUser" STRING NOT NULL,
    "district" STRING NOT NULL,
    "city" STRING NOT NULL,
    "province" STRING NOT NULL,
    "postalCode" STRING NOT NULL,
    "detailAddress" STRING NOT NULL,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saller" (
    "id" STRING NOT NULL,
    "idSaller" STRING NOT NULL,
    "name_brand" STRING NOT NULL,
    "deskripsi_toko" STRING,
    "alamat" STRING,
    "imgUrl" STRING,

    CONSTRAINT "saller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "approvalSaller" (
    "id" STRING NOT NULL,
    "idSaller" STRING NOT NULL,
    "name_brand" STRING NOT NULL,
    "deskripsi_toko" STRING,
    "alamat" STRING,
    "imgUrl" STRING,
    "disable" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "approvalSaller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" STRING NOT NULL,
    "namaProduct" STRING NOT NULL,
    "hargaProduct" DECIMAL(65,30) NOT NULL,
    "imgUrl" STRING,
    "idSaller" STRING NOT NULL,
    "idUser" STRING NOT NULL,
    "idProduct" STRING NOT NULL,
    "qty" INT4 NOT NULL DEFAULT 1,
    "fixedPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" STRING NOT NULL,
    "pengirim" STRING NOT NULL,
    "namaPengirim" STRING NOT NULL,
    "imgPengirim" STRING,
    "penerima" STRING NOT NULL,
    "namaPenerima" STRING NOT NULL,
    "imgPenerima" STRING,
    "message" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" STRING NOT NULL,
    "idSaller" STRING NOT NULL,
    "nama" STRING NOT NULL,
    "harga" DECIMAL(65,30) NOT NULL,
    "deskripsi" STRING,
    "deskripsiSingkat" STRING,
    "kategori" STRING,
    "stok" INT4 NOT NULL,
    "rekomendasi" BOOL NOT NULL DEFAULT false,
    "imgUrl" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saller" ADD CONSTRAINT "saller_idSaller_fkey" FOREIGN KEY ("idSaller") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvalSaller" ADD CONSTRAINT "approvalSaller_idSaller_fkey" FOREIGN KEY ("idSaller") REFERENCES "saller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_pengirim_fkey" FOREIGN KEY ("pengirim") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_penerima_fkey" FOREIGN KEY ("penerima") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_idSaller_fkey" FOREIGN KEY ("idSaller") REFERENCES "saller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
