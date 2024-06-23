CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(255),
    @user_password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users(user_id, username, email, user_password)
    VALUES(@user_id, @username, @email, @user_password)
END