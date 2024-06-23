import express from 'express';
import { EventController } from '../controllers/event.controller';

const event_router = express.Router();

let controller = new EventController()

event_router.post('/create', controller.createEvent);
event_router.get('/all-events', controller.fetchAllEvents);
event_router.get('/:event_id', controller.fetchSingleEvent)
event_router.put('/:event_id', controller.updateEvent)
event_router.delete('/:event_id', controller.deleteEvent)

export default event_router;
