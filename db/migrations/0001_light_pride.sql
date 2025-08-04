ALTER TABLE `journal_entries` MODIFY COLUMN `userId` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `llm_cache` MODIFY COLUMN `userId` bigint NOT NULL;