import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../landing/landing.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, LandingComponent, AdminDashboardComponent, UserDashboardComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = ''

  constructor(private router: Router) {}

  login() {
    fetch('http://localhost:5300/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        role: this.role,
        password: this.password
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Logged data:",data);
      if (data.role === 'user'){
        this.router.navigateByUrl('user-dashboard');
      }else{
        this.router.navigateByUrl('admin-dashboard');
      }
      
      // if (data.user && data.user.role === 'admin') {
      //   this.router.navigate(['/admin-dashboard']);
      // } else if (data.user && data.user.role === 'user') {
      //   this.router.navigateByUrl('user-dashboard');
      // }
    })
    .catch((error) => {
      console.error('Error logging in', error);
    });
  }
}