CREATE TABLE `payments` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`code` text NOT NULL,
	`grid_id` text NOT NULL,
	FOREIGN KEY (`grid_id`) REFERENCES `gameGrids`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gameGrids` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`cells` text NOT NULL,
	`sizeX` integer NOT NULL,
	`sizeY` integer NOT NULL
);
