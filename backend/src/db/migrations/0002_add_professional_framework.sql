CREATE TABLE `llm_cache` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`fromDate` date NOT NULL,
	`toDate` date NOT NULL,
	`summaryText` text NOT NULL,
	`cachedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `llm_cache_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_framework` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`topic` text NOT NULL,
	`goal` text NOT NULL,
	`description` text NOT NULL,
	`behaviours` text NOT NULL,
	CONSTRAINT `professional_framework_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_grade_expectations` (

);
--> statement-breakpoint
ALTER TABLE `llm_cache` ADD CONSTRAINT `llm_cache_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;