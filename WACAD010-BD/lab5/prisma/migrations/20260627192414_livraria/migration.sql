-- CreateTable
CREATE TABLE `Autor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `pais_nascimento` VARCHAR(191) NOT NULL,
    `nota_biografica` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livro` (
    `codigo` VARCHAR(191) NOT NULL,
    `idioma` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ano` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Edicao` (
    `isbn` VARCHAR(191) NOT NULL,
    `preco` DECIMAL(65, 30) NOT NULL,
    `ano` INTEGER NOT NULL,
    `num_paginas` INTEGER NOT NULL,
    `qtd_estoque` INTEGER NOT NULL,
    `id_editora` INTEGER NULL,
    `livro_codigo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Editora` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefone` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Cria` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Cria_AB_unique`(`A`, `B`),
    INDEX `_Cria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Edicao` ADD CONSTRAINT `Edicao_id_editora_fkey` FOREIGN KEY (`id_editora`) REFERENCES `Editora`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edicao` ADD CONSTRAINT `Edicao_livro_codigo_fkey` FOREIGN KEY (`livro_codigo`) REFERENCES `Livro`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Cria` ADD CONSTRAINT `_Cria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Autor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Cria` ADD CONSTRAINT `_Cria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Livro`(`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
