-- Добавляем Git-поля в таблицу projects
ALTER TABLE `projects` ADD COLUMN `git_provider` text;
ALTER TABLE `projects` ADD COLUMN `git_repository_url` text;
ALTER TABLE `projects` ADD COLUMN `git_repository_id` text;
ALTER TABLE `projects` ADD COLUMN `git_branch` text DEFAULT 'main';
ALTER TABLE `projects` ADD COLUMN `git_access_token` text;

-- Создаем таблицу для Git-провайдеров
CREATE TABLE `git_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL,
	`base_url` text NOT NULL,
	`client_id` text,
	`client_secret` text,
	`is_active` integer DEFAULT 1,
	`created_at` integer
);

-- Добавляем базовые Git-провайдеры
INSERT INTO `git_providers` (`id`, `name`, `display_name`, `base_url`, `is_active`, `created_at`) VALUES
('github', 'github', 'GitHub', 'https://github.com', 1, strftime('%s', 'now')),
('gitlab', 'gitlab', 'GitLab', 'https://gitlab.com', 1, strftime('%s', 'now')),
('bitbucket', 'bitbucket', 'Bitbucket', 'https://bitbucket.org', 1, strftime('%s', 'now'));
