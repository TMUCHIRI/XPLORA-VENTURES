CREATE OR ALTER PROCEDURE loginUser
    @email VARCHAR(255)
AS
BEGIN
    SELECT email, user_password AS password, role
    FROM Users
    WHERE email = @email
END;
