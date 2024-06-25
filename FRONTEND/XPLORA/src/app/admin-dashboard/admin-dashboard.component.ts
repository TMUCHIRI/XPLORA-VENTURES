import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { Event } from '../models/event.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  events: Event[] = [];
  newEvent: Event = {
    event_id: '',
    description: '',
    destination: '',
    duration: '',
    price: 0,
    tour_type: ''
  };
  updateEvent: Event = {  // Fix the property name here
    event_id: '',
    description: '',
    destination: '',
    duration: '',
    price: 0,
    tour_type: ''
  };
  updateEventId: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Fetch initial data if needed
  }

  async fetchAllUsers() {
    try {
      const response = await fetch('http://localhost:5300/users/fetch-all');
      console.log('Response received:', response);
      const data = await response.json();
      console.log('Data received:', data);

      console.log(data.users);
      let users = data.users;
      
      users.forEach((user: User) => {
        this.users.push(user);
        
      });
      
      // if (Array.isArray(data)) {
      //   this.users = data;
      //   console.log('Users array updated:', this.users);
      // } else {
      //   console.error('Received data is not an array:', data);
      //   this.users = [];
      // }
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  viewUser(userId: string) {
    fetch(`http://localhost:5300/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle displaying the user details
      })
      .catch(error => {
        console.error('Error fetching user details', error);
      });
  }

  switchUserRole(userId: string) {
    fetch('http://localhost:5300/users/switch-role', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle role switch response
      })
      .catch(error => {
        console.error('Error switching user role', error);
      });
  }

  async fetchAllEvents() {

    try {
      const response = await fetch('http://localhost:5300/events/all-events');
      const data = await response.json();
      console.log('Data received:', data);
      console.log(data.event);
      
      let events = data.event;
      console.log(events);
      
      
      events.forEach((event: Event) => {
        this.events.push(event);
        
      });
      
      // if (Array.isArray(data)) {
      //   this.events = data;
      //   console.log('Events array updated:', this.events);
      // } else {
      //   console.error('Received data is not an array:', data);
      //   this.events = [];
      // }

    } catch (error) {
      console.error('Error fetching events', error);
    }
  }

  createEvent() {
    fetch('http://localhost:5300/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.newEvent)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle event creation response
        this.fetchAllEvents();
      })
      .catch(error => {
        console.error('Error creating event', error);
      });
  }

  viewEvent(eventId: string) {
    fetch(`http://localhost:5300/events/${eventId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle displaying the event details
      })
      .catch(error => {
        console.error('Error fetching event details', error);
      });
  }

  update_Event() {
    fetch(`http://localhost:5300/events/${this.updateEventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.updateEvent)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle event update response
        this.fetchAllEvents();
      })
      .catch(error => {
        console.error('Error updating event', error);
      });
  }

  deleteEvent(eventId: string) {
    fetch(`http://localhost:5300/events/${eventId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle event deletion response
        this.fetchAllEvents();
      })
      .catch(error => {
        console.error('Error deleting event', error);
      });
  }
}
