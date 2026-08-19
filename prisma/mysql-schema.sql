-- ---------------------------------------------------------------------------
-- Compublue CMS -- MySQL / MariaDB table structure
--
-- YOU NORMALLY DO NOT NEED THIS FILE.
-- `npm run migrate` on the server creates these tables AND fills them with the
-- site's starter content. This file is the fallback for when you cannot run
-- that (no SSH, or Prisma fails to connect): import it in phpMyAdmin to create
-- the empty tables, then run `npm run db:seed` to add the content.
--
-- Importing this creates STRUCTURE ONLY -- no pages, services, or admin user.
--
-- phpMyAdmin > select your database > Import > choose this file > Go.
-- ---------------------------------------------------------------------------

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT 'Admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `seoTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `seoDesc` VARCHAR(500) NOT NULL DEFAULT '',
    `ogImage` VARCHAR(1000) NOT NULL DEFAULT '',
    `canonical` VARCHAR(1000) NOT NULL DEFAULT '',
    `schemaJson` TEXT NOT NULL,
    `noindex` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Page_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `body` LONGTEXT NOT NULL,
    `bullets` TEXT NOT NULL,
    `icon` VARCHAR(64) NOT NULL DEFAULT 'spark',
    `image` VARCHAR(1000) NOT NULL DEFAULT '',
    `imageAlt` VARCHAR(500) NOT NULL DEFAULT '',
    `imageFocal` VARCHAR(64) NOT NULL DEFAULT 'center',
    `image2` VARCHAR(1000) NOT NULL DEFAULT '',
    `image2Alt` VARCHAR(500) NOT NULL DEFAULT '',
    `faqs` TEXT NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `showWhatYouGet` BOOLEAN NOT NULL DEFAULT true,
    `seoTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `seoDesc` VARCHAR(500) NOT NULL DEFAULT '',
    `ogImage` VARCHAR(1000) NOT NULL DEFAULT '',
    `canonical` VARCHAR(1000) NOT NULL DEFAULT '',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Service_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseStudy` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `client` VARCHAR(191) NOT NULL DEFAULT '',
    `industry` VARCHAR(191) NOT NULL DEFAULT '',
    `summary` TEXT NOT NULL,
    `challenge` TEXT NOT NULL,
    `solution` TEXT NOT NULL,
    `results` TEXT NOT NULL,
    `image` VARCHAR(1000) NOT NULL DEFAULT '',
    `imageAlt` VARCHAR(500) NOT NULL DEFAULT '',
    `tags` VARCHAR(1000) NOT NULL DEFAULT '[]',
    `order` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `seoTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `seoDesc` VARCHAR(500) NOT NULL DEFAULT '',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CaseStudy_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `body` LONGTEXT NOT NULL,
    `image` VARCHAR(1000) NOT NULL DEFAULT '',
    `imageAlt` VARCHAR(500) NOT NULL DEFAULT '',
    `author` VARCHAR(191) NOT NULL DEFAULT 'Compublue Team',
    `tags` VARCHAR(1000) NOT NULL DEFAULT '[]',
    `published` BOOLEAN NOT NULL DEFAULT true,
    `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seoTitle` VARCHAR(255) NOT NULL DEFAULT '',
    `seoDesc` VARCHAR(500) NOT NULL DEFAULT '',
    `ogImage` VARCHAR(1000) NOT NULL DEFAULT '',
    `canonical` VARCHAR(1000) NOT NULL DEFAULT '',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(64) NOT NULL DEFAULT '',
    `company` VARCHAR(191) NOT NULL DEFAULT '',
    `service` VARCHAR(191) NOT NULL DEFAULT '',
    `budget` VARCHAR(191) NOT NULL DEFAULT '',
    `message` TEXT NOT NULL,
    `page` VARCHAR(500) NOT NULL DEFAULT '',
    `ip` VARCHAR(64) NOT NULL DEFAULT '',
    `status` VARCHAR(32) NOT NULL DEFAULT 'new',
    `redacted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivacyRequest` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adminEmail` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `action` VARCHAR(32) NOT NULL,
    `scope` VARCHAR(32) NOT NULL,
    `affectedCount` INTEGER NOT NULL DEFAULT 0,
    `retainedReason` VARCHAR(2000) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(1000) NOT NULL,
    `alt` VARCHAR(500) NOT NULL DEFAULT '',
    `credit` VARCHAR(500) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

