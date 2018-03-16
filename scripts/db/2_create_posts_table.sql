CREATE TABLE IF NOT EXISTS posts (
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `user_id`      INT NOT NULL,
    `content`      VARCHAR(255) NOT NULL,
    `created_at`   TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
