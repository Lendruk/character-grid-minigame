CREATE TABLE `userSessions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`token` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);