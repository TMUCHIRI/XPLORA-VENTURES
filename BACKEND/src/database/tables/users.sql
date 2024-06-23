CREATE TABLE Users (user_id VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, user_password VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT 'user')

ALTER TABLE Users
ADD CONSTRAINT PK_UserID PRIMARY KEY (user_id);

ALTER TABLE Users
ADD CONSTRAINT UQ_Email UNIQUE (email);

INSERT INTO Users(user_id, username, email, user_password)VALUES(
    '1234567', 'TIMO', 'TIMO@example.com', '1234567890'
)

SELECT * FROM Users