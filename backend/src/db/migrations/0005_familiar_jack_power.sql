ALTER TABLE `journal_entries` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `llm_cache` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `professional_framework` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
CREATE INDEX `index_journal_entries_date` ON `journal_entries` (`date`);--> statement-breakpoint
CREATE INDEX `index_journal_entries_user_id` ON `journal_entries` (`userId`);--> statement-breakpoint
CREATE INDEX `idx_user_email` ON `users` (`email`);