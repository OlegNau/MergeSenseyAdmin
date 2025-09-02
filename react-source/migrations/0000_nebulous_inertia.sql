CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`pipeline_id` text,
	`metric_type` text NOT NULL,
	`metric_name` text NOT NULL,
	`value` real NOT NULL,
	`unit` text,
	`tags` text DEFAULT '{}' NOT NULL,
	`timestamp` integer NOT NULL,
	`period` text NOT NULL,
	`metadata` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pipeline_id`) REFERENCES `pipelines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `execution_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`pipeline_id` text NOT NULL,
	`project_id` text NOT NULL,
	`status` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer,
	`duration` integer,
	`input` text NOT NULL,
	`output` text,
	`error` text,
	`agent` text NOT NULL,
	`trigger` text NOT NULL,
	`environment` text DEFAULT 'development' NOT NULL,
	`version` text DEFAULT '1.0.0' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`pipeline_id`) REFERENCES `pipelines`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pipelines` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`agents` text DEFAULT '[]' NOT NULL,
	`trigger` text NOT NULL,
	`last_run` integer,
	`created_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);