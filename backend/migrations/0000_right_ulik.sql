CREATE TABLE `payments` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text,
	`amount` integer,
	`code` text,
	`grid_id` text,
	FOREIGN KEY (`grid_id`) REFERENCES `gameGrids`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gameGrids` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`cells` text,
	`sizeX` integer,
	`sizeY` integer
);
