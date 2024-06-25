import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5300/bookings';

  constructor(private http: HttpClient) {}

  bookEvent(booking: Booking): Observable<any> {
    return this.http.post(this.baseUrl, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBookingsByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }

  getBookingsByEvent(eventId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/event/${eventId}`);
  }

  cancelBooking(booking: Booking): Observable<any> {
    return this.http.request('delete', this.baseUrl, { body: booking });
  }
}
