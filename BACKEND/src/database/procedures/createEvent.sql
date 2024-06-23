CREATE OR ALTER PROCEDURE createEvent(
    @event_id VARCHAR(255),
    @description VARCHAR(255),
    @destination VARCHAR(50),
    @duration VARCHAR(50),
    @price DECIMAL(10,2),
    @tour_type VARCHAR(255)
)
AS
BEGIN
    INSERT INTO event(event_id, description, destination, duration, price, tour_type) VALUES(@event_id, @description, @destination, @duration, @price, @tour_type)
END