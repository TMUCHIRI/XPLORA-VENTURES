import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.interface';
import { Event } from '../models/event.interface';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userName: string = ''; 
  userId: string = ''; 
  bookings: Booking[] = [];
  events: Event[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.username;
      this.userId = user.user_id;
      this.getBookingsByUser(this.userId);
      this.viewAllEvents(); // Load all events on init
    }
  }

  updateUserDetails(userDetails: { username: string, email: string, password: string }) {
    fetch(`http://localhost:5300/users/${this.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
    .then(response => response.json())
    .then(data => {
      console.log('User details updated', data);
    })
    .catch(error => {
      console.error('Error updating user details', error);
    });
  }

  viewAllEvents() {
    fetch('http://localhost:5300/events/all-events')
      .then(response => response.json())
      .then(events => {
        this.events = events;
        console.log(events)
        
      })
      .catch(error => {
        console.error('Error fetching all events', error);
      });
  }

  bookEvent(eventId: string) {
    fetch('http://localhost:5300/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: this.userId, event_id: eventId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Event booked', data);
      this.getBookingsByUser(this.userId);
    })
    .catch(error => {
      console.error('Error booking event', error);
    });
  }

  getBookingsByUser(userId: string) {
    fetch(`http://localhost:5300/bookings/user/${userId}`)
      .then(response => response.json())
      .then(bookings => {
        this.bookings = bookings;
      })
      .catch(error => {
        console.error('Error fetching bookings', error);
      });
  }

  cancelBooking(eventId: string) {
    fetch('http://localhost:5300/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: this.userId, event_id: eventId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Booking cancelled', data);
      this.bookings = this.bookings.filter(b => b.event_id !== eventId);
    })
    .catch(error => {
      console.error('Error cancelling booking', error);
    });
  }
}
