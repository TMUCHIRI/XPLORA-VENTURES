// auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';  // Adjust the path according to your project structure

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser(): User | null {
    // This method should return the currently logged-in user
    // For simplicity, we can assume it fetches the user from localStorage or a similar mechanism
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }
}
