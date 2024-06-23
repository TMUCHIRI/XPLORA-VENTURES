import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_router from './routes/user.routes';
import event_router from './routes/event.routes';
import booking_router from './routes/booking.routes';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware
app.use((req, res, next) => {
    // console.log('Middleware hit:', req.method, req.url);
    // console.log('Request URL:', req.url);
    // console.log('Request Headers:', req.headers);
    next();
});

app.use(bodyParser.json());
app.use(express.json());

app.use('/users', user_router);
app.use('/events', event_router);
app.use('/bookings', booking_router)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.status(500).json({
        message: err.message
    })
})

const PORT = 5300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
