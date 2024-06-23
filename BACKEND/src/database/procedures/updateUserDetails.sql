CREATE OR ALTER PROCEDURE updateUserDetails(
    @user_id VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(255),
    @user_password VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET username=@username, email=@email, user_password=@user_password WHERE user_id=@user_id
END