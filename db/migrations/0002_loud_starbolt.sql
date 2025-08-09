ALTER TABLE `journal_entries` MODIFY COLUMN `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `llm_cache` MODIFY COLUMN `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `firstName` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `lastName` varchar(100) NOT NULL;