CREATE TABLE `grade_expectations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`grade` varchar(100) NOT NULL,
	`expectation` text NOT NULL,
	CONSTRAINT `grade_expectations_id` PRIMARY KEY(`id`),
	CONSTRAINT `grade_expectations_grade_unique` UNIQUE(`grade`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `grade` varchar(100);