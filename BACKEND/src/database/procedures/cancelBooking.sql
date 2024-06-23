CREATE  OR ALTER PROCEDURE cancelBooking
    @user_id VARCHAR(255),
    @event_id VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM bookings
    WHERE user_id = @user_id AND event_id = @event_id;

    -- Check if any rows were affected
    IF @@ROWCOUNT > 0
    BEGIN
        SELECT 'Booking cancelled successfully' AS message;
    END
    ELSE
    BEGIN
        SELECT 'Booking not found' AS error;
    END
END;
