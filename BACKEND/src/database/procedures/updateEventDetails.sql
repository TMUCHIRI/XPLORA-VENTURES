CREATE OR ALTER PROCEDURE updateEventDetails(
    @event_id VARCHAR(255),
    @description VARCHAR(255),
    @destination VARCHAR(50),
    @duration VARCHAR(50),
    @price DECIMAL(10,2),
    @tour_type VARCHAR(255)
)
AS
BEGIN
    UPDATE event SET description = @description, destination = @destination, duration = @duration, price = @price, tour_type = @tour_type WHERE event_id = @event_id
END